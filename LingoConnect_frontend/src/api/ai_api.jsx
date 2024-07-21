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

export const getAudioFeedback = async ({title, question, formData}) => {
    try {
        const encodedTitle = encodeURIComponent(title);
        const encodedQuestion = encodeURIComponent(question);
        const response = await axios.post(`${BASE_URL}/pronunciation/?title=${encodedTitle}&question=${encodedQuestion}`,
            {
                title,
                question,
                formData
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