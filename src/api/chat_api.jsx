import axios from 'axios';

const BASE_URL = "http://localhost:8080";

export const getFeedback = async ({ gptTitle, gptQuestion, gptUserAnswer }) => {
    try {
        console.log(gptTitle, gptQuestion, gptUserAnswer);
        const encodedTitle = encodeURIComponent(gptTitle);
        const encodedQuestion = encodeURIComponent(gptQuestion);
        const encodedUserAnswer = encodeURIComponent(gptUserAnswer);
        const response = await axios.get(`${BASE_URL}/openai/?title=${encodedTitle}&question=${encodedQuestion}&userAnswer=${encodedUserAnswer}`,
            {
                gptTitle,
                gptQuestion,
                gptUserAnswer
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

export const getPronunciationScore = async ({}) => {
    try {
        const response = await axios.post(`${BASE_URL}/pronunciation/`,
            {

            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        return {status: response.status, data: response.data};
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
}