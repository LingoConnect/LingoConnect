import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// 피드백 가져오기
export const getMyFeedback = async (topic) => {
  try {
    const encodedTitle = encodeURIComponent(topic);
    const response = await axios.post(
      `${BASE_URL}/feedback/?topic=${encodedTitle}`,
      {},
      {
        headers: {
          Accept: 'application/json',
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

// 패턴 가져오기
export const getMyPattern = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/openai/analysis`, {
      headers: {
        Accept: 'application/json',
      },
    });
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

// 학습 성취도와 발음 점수 평균 계산
export const getMyInfo = async (topics) => {
  if (!Array.isArray(topics) || topics.length === 0) {
    console.error('Invalid or empty topics array');
    return 0;
  }

  let filteredList = [];

  const fetchStudyQuestion = async (topic) => {
    try {
      const response = await getMyFeedback(topic);

      if (response.status === 200) {
        // response.data의 각 요소를 확인하여 중복되지 않은 question을 추가
        response.data.forEach((element) => {
          if (!filteredList.some((item) => item.question === element.question)) {
            filteredList.push(element);
          }
        });
      } else {
        console.error(`Failed to fetch feedback for topic: ${topic}`);
      }
    } catch (error) {
      console.error(`Error fetching feedback for topic: ${topic}`, error);
    }
  };

  await Promise.all(topics.map((element) => fetchStudyQuestion(element.topic)));

  const ratio = (100 * filteredList.length) / (topics.length * 6);

  return ratio;
};
