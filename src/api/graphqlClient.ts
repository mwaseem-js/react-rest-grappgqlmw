import { ApolloClient, InMemoryCache } from '@apollo/client';

// Create an Apollo Client instance
const graphqlClient = new ApolloClient({
  uri: '/graphql', // Replace with your actual GraphQL endpoint
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          transactions: {
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

export default graphqlClient;