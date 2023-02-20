import {ApolloClient, InMemoryCache} from "@apollo/client";

export default new ApolloClient({
  uri: 'http://localhost:3051',
  cache: new InMemoryCache(),
});
