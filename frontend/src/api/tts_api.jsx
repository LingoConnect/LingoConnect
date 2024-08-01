import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getTTS = async ({ text }) => {
  try {
    const response = await axios.get(`${BASE_URL}/tts/?text=${text}`, {
      responseType: 'blob', // 응답을 Blob 형태로 받도록 설정
      headers: {
        Accept: 'audio/mpeg', // 서버에서 오디오 파일을 받을 수 있도록 설정
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
