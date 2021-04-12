import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const PRODUCT_DETAILS = gql`
  query ProcuctDetails {
    productDetails {
      product {
        id
        name
      }
      items {
        id
        name
      }
    }
  }
`;

const ITEMS_COUNTS = gql`
  query ItemsCounts {
    itemsCounts {
      id
      count
    }
  }
`;

const ItemsCounts = () => {
  const {
    loading,
    data,
  } = useQuery(ITEMS_COUNTS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <p>Loading items counts...</p>;


  return (
    <>
      <h2>Items Counts</h2>
      <ul>
        <li># counts: {data?.itemsCounts.length}</li>
      </ul>
    </>
  );
};

const App = () => {
  const {
    loading,
    data,
  } = useQuery(PRODUCT_DETAILS, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Product Details</h2>
      {loading ? (
        <p>Loading product details...</p>
      ) : (
        <>
          <ul>
            <li key="id">ID: {data?.productDetails?.product.id}</li>
            <li key="name">Name: {data?.productDetails?.product.name}</li>
            <li key="items"># items: {data?.productDetails?.items.length}</li>
          </ul>
          <ItemsCounts />
        </>
      )}
    </main>
  );
};

export default App;
