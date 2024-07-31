import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const getMyFeedback = async ({ topic }) => {
  try {
    const encodedTitle = encodeURIComponent(topic);
    const response = await axios.post(`${BASE_URL}/feedback/?topic=${encodedTitle}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.reposne) {
      const { status } = error.response;
      console.error(`Error ${status}`);
      return { status };
    } else {
      console.error('Unknown error occurred.');
      return { status: 500, data: null };
    }
  }
};

export const getMyPattern = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/openai/analysis`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.reposne) {
      const { status } = error.response;
      console.error(`Error ${status}`);
      return { status };
    } else {
      console.error('Unknown error occurred.');
      return { status: 500, data: null };
    }
  }
};
