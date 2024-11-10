import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Create Apollo Client
const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_URI, // Ensure this URI is set in your .env
  cache: new InMemoryCache(),
});

// Define the GraphQL mutation for creating a feeding entry
const CREATE_FEEDING_MUTATION = gql`
  mutation CreateFeeding($feedingTime: String!, $amount: Float!, $dha: Boolean!) {
    createFeeding(feedingTime: $feedingTime, amount: $amount, dha: $dha) {
      id
      feedingTime
      amount
      dha
    }
  }
`;

// Function to create a feeding entry
export const createFeeding = async (
  feedingTime: string,
  amount: number,
  dha: boolean
) => {
  try {
    const response = await client.mutate({
      mutation: CREATE_FEEDING_MUTATION,
      variables: {
        feedingTime,
        amount,
        dha,
      },
    });
    return response.data.createFeeding;
  } catch (error) {
    console.error('Error creating feeding entry:', error);
    throw error;
  }
};
