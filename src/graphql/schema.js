import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

const ProductItemType = new GraphQLObjectType({
  name: 'ProductItem',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const ProductDetailsType = new GraphQLObjectType({
  name: 'ProductDetails',
  fields: {
    product: { type: ProductType },
    items: { type: new GraphQLList(ProductItemType) },
  },
});

const ItemCountType = new GraphQLObjectType({
  name: 'ItemCount',
  fields: {
    id: { type: GraphQLID },
    count: { type: GraphQLInt },
  },
});

const nbItems = 50000;
const itemsData = Array.from({ length: nbItems }, (v, i) => ({ id: i, name: `item #${i}` }));
const itemCountMax = 1000;
const itemCountMin = 0;
const itemsCounts = itemsData.map(({ id }) => {
  const count = Math.floor(Math.random() * (itemCountMax - itemCountMin + 1) + itemCountMin);
  return { id, count };
});

const productData = { id: 1, name: 'Product #1' };

const productDetailsData = { product: productData, items: itemsData };

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    productDetails: {
      type: ProductDetailsType,
      resolve: () => productDetailsData,
    },
    itemsCounts: {
      type: new GraphQLList(ItemCountType),
      resolve: () => itemsCounts,
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
