import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const sendFeedbackMail = async ({ receiver, title, content }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/mail/`,
      {
        receiver,
        title,
        content,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': `application/json`,
        },
      }
    );
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response;
      console.error(`Error ${status}`);
      return { status, data: null };
    } else {
      console.error('Unknown error occurred.');
      return { status: 500, data: null };
    }
  }
};
