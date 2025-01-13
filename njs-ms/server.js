const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const express = require('express');
const bodyParser = require('body-parser');

// Load the proto file
const packageDefinition = protoLoader.loadSync('example.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const exampleProto = grpc.loadPackageDefinition(packageDefinition).ExampleService;

// Create gRPC server
const grpcServer = new grpc.Server();
grpcServer.addService(exampleProto.service, {
  GetExampleData: (call, callback) => {
    const query = call.request.query;
    console.log(`Received gRPC query: ${query}`);
    callback(null, { message: `Hello, ${query}!`, status: 200 });
  },
});

// Start gRPC server
grpcServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC server running on port 50051');
  grpcServer.start();
});

// Create REST API server
const app = express();
app.use(bodyParser.json());

// REST API endpoint
app.post('/api/example', (req, res) => {
  const query = req.body.query;
  console.log(`Received REST query: ${query}`);
  res.json({ message: `Hello, ${query}!`, status: 200 });
});

// Start REST server
const REST_PORT = 3000;
app.listen(REST_PORT, () => {
  console.log(`REST API server running on port ${REST_PORT}`);
});
