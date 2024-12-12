import { gql } from 'apollo-server';

export const blogTypeDefs = gql`
  scalar Upload

  type Blog {
    id: ID! # Ensure id is non-nullable
    title: String!
    content: String!
    image: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    blogs: [Blog!]!
    blog(id: ID!): Blog
  }

  type Mutation {
    createBlog(title: String!, content: String!, image: Upload): Blog!
    deleteBlog(id: ID!): Blog!
  }
`;
