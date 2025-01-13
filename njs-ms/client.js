const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the proto file
const packageDefinition = protoLoader.loadSync('users.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const usersProto = grpc.loadPackageDefinition(packageDefinition).UsersService;

// Create a client instance
const client = new usersProto('localhost:50053', grpc.credentials.createInsecure());

// Make a request to the server
const request = { query: 'GetUsersRequest' };
client.GetUsersData(request, (err, response) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Response from server:', response);
  }
});
