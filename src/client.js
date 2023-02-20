import {ApolloClient, InMemoryCache} from "@apollo/client";

export default new ApolloClient({
  uri: 'http://localhost:3051/graphql',
  cache: new InMemoryCache(),
});
