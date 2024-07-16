import axios from 'axios';

const BASE_URL = "http://localhost:8080";

export const getFeedback = async ({ title, question, userAnswer }) => {
    try {
        const response = await axios.get(`${BASE_URL}/openai/?title=${title}&question=${question}&userAnswer=${userAnswer}`,
            {
                title,
                question,
                userAnswer
            },
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