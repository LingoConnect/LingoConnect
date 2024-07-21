import axios from 'axios';

const BASE_URL = "http://localhost:8080";

export const getTopic = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/topic/`,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        )
        return { status: response.status, data: response.data };
    } catch (error) {
        if (axios.isAxiosError(error) && error.reposne) {
            const { status, data } = error.response;
            console.error(`Error ${status}`);
            return { status };
        } else {
            console.error('Unknown error occurred.');
            return { status: 500, data: null };
        }
    }
};

export const getMainQuestion = async ({ topic }) => {
    try {
        const encodedTopic = encodeURIComponent(topic);
        const response = await axios.get(`${BASE_URL}/question/main?topic=${encodedTopic}`,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        )
        return { status: response.status, data: response.data };
    } catch (error) {
        if (axios.isAxiosError(error) && error.reposne) {
            const { status, data } = error.response;
            console.error(`Error ${status}`);
            return { status };
        } else {
            console.error('Unknown error occurred.');
            return { status: 500, data: null };
        }
    }
};

export const getSubQuestion = async ({ topic, id }) => {
    try {
        const encodedTopic = encodeURIComponent(topic);
        const response = await axios.get(`${BASE_URL}/question/sub?topic=${encodedTopic}&mainQuestionId=${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        )
        return { status: response.status, data: response.data };
    } catch (error) {
        if (axios.isAxiosError(error) && error.reposne) {
            const { status, data } = error.response;
            console.error(`Error ${status}`);
            return { status };
        } else {
            console.error('Unknown error occurred.');
            return { status: 500, data: null };
        }
    }
};