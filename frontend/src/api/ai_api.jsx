import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getFeedback = async ({ topic, currentQuestion, answerInput, questionClass }) => {
  try {
    const encodedTitle = encodeURIComponent(topic);
    const encodedQuestion = encodeURIComponent(currentQuestion);
    const encodedUserAnswer = encodeURIComponent(answerInput);
    const encodedQuestionClass = encodeURIComponent(questionClass);

    console.log(topic, currentQuestion, answerInput, questionClass);

    const response = await axios.get(
      `${BASE_URL}/openai/?title=${encodedTitle}&question=${encodedQuestion}&userAnswer=${encodedUserAnswer}&questionClass=${encodedQuestionClass}`,
      {
        title: topic,
        question: currentQuestion,
        userAnswer: answerInput,
        questionClass: questionClass,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
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

export const getAudioFeedback = async (audioBuffer) => {
  try {
    const response = await axios.post(`${BASE_URL}/pronunciation/`, audioBuffer, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
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

export const getImageTopic = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/openai/images`, {
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

export const getRandomImage = async ({ topic }) => {
  try {
    const encodedTopic = encodeURIComponent(topic);
    const response = await axios.get(`${BASE_URL}/openai/image/random?topic=${encodedTopic}`, {
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

export const getImageAnalysis = async ({ prompt, imageUrl }) => {
  try {
    const encodedPrompt = encodeURIComponent(prompt);
    const encodedImageUrl = encodeURIComponent(imageUrl);
    const response = await axios.get(
      `${BASE_URL}/openai/image/analysis?prompt=${encodedPrompt}&imageUrl=${encodedImageUrl}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
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

export const getImage = async ({ prompt }) => {
  try {
    const encodedPrompt = encodeURIComponent(prompt);
    const response = await axios.post(`${BASE_URL}/openai/image?prompt=${encodedPrompt}`, {
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
