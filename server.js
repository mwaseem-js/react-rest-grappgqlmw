// server.js
const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

// Define your type definitions
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    phone: String!
  }

  type Query {
    users: [User]
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    users: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      return response.data;
    },
  },
};

// Create the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
