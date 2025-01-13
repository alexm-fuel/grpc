const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the proto file
const packageDefinition = protoLoader.loadSync('service.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const exampleProto = grpc.loadPackageDefinition(packageDefinition).ExampleService;

// Create a client instance
const client = new exampleProto('localhost:50051', grpc.credentials.createInsecure());

// Make a request to the server
const request = { query: 'World' };
client.GetExampleData(request, (err, response) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Response from server:', response);
  }
});
