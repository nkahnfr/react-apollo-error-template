import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { link } from "./graphql/link";
import App from "./App";

import "./index.css";

const cache = new InMemoryCache({
  typePolicies: {
    ProductItem: {
      keyFields: false, // disable normalization (i.e. embed within their parent object in the cache)
    },
    ItemCount: {
      keyFields: false, // disable normalization (i.e. embed within their parent object in the cache)
    },
  },
});

const client = new ApolloClient({
  cache,
  link
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
