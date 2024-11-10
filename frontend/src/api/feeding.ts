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

// Define the GraphQL query to fetch today's feedings
const GET_TODAYS_FEEDINGS = gql`
  query GetTodaysFeedings {
    getTodaysFeedings {
      id
      feedingTime
      amount
      dha
    }
  }
`;

const GET_FEEDINGS_QUERY = gql`
  query GetFeedings {
    getFeedings {
      id
      feedingTime
      amount
      addedBy
      dha
      addedAt
      updatedAt
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

// Function to fetch today's feedings
export const fetchTodaysFeedings = async () => {
  try {
    const response = await client.query({
      query: GET_TODAYS_FEEDINGS,
      fetchPolicy: 'no-cache', // Ensures fresh data every time the query is run
    });
    return response.data.getTodaysFeedings;
  } catch (error) {
    console.error('Error fetching today\'s feedings:', error);
    throw error;
  }
};

// Function to fetch all feeding entries
export const fetchFeedings = async () => {
  try {
    const response = await client.query({
      query: GET_FEEDINGS_QUERY,
    });
    return response.data.getFeedings;
  } catch (error) {
    console.error('Error fetching feedings:', error);
    throw error;
  }
};
