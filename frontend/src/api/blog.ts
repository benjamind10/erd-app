import { gql } from '@apollo/client';

export const GET_BLOGS = gql`
  query GetBlogs {
    blogs {
      id
      title
      content
      image
      createdAt
    }
  }
`;

export const GET_BLOG = gql`
  query GetBlog($id: ID!) {
    blog(id: $id) {
      id
      title
      content
      image
      createdAt
    }
  }
`;

export const CREATE_BLOG = gql`
  mutation CreateBlog($title: String!, $content: String!, $image: Upload) {
    createBlog(title: $title, content: $content, image: $image) {
      id
      title
      content
      image
      createdAt
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id) {
      id
    }
  }
`;

export const MANAGE_COMMENTS = gql`
  mutation ManageComments($blogId: ID!, $comments: [String!]!) {
    manageComments(blogId: $blogId, comments: $comments) {
      id
      comments
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog(
    $id: ID!
    $title: String!
    $content: String!
    $image: String
  ) {
    updateBlog(id: $id, title: $title, content: $content, image: $image) {
      id
      title
      content
      createdAt
    }
  }
`;
