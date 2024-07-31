// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ChatPracticeContent from './chat_practice';
// import { getFeedback, getAudioFeedback } from '../../api/ai_api';
import { getSubQuestion } from '../../api/learning_content_api';

// API 호출 모킹
jest.mock('../../api/ai_api', () => ({
  getFeedback: jest.fn(),
  getAudioFeedback: jest.fn(),
}));

jest.mock('../../api/learning_content_api', () => ({
  getSubQuestion: jest.fn(),
}));

describe('ChatPracticeContent', () => {
  beforeAll(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });

  //   beforeEach(() => {
  //     getSubQuestion.mockResolvedValue({
  //       status: 200,
  //       data: ['SubQuestion1', 'SubQuestion2'],
  //     });
  //   });
  test('렌더링 시 getSubQuestion 호출 확인', async () => {
    // Arrange: getSubQuestion을 스파이로 설정

    // Render the component
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/study/chat/practice',
            state: { topic: 'Topic', question: 'Question', id: 1 },
          },
        ]}
      >
        <ChatPracticeContent />
      </MemoryRouter>
    );

    // Act & Assert: getSubQuestion이 호출되었는지 확인
    await waitFor(() => {
      expect(getSubQuestion).toHaveBeenCalled();
    });
  });

  //   test('send 버튼 클릭 시 getFeedback 호출 확인', async () => {
  //     // Arrange
  //     const getFeedbackSpy = jest.spyOn(require('../../api/ai_api'), 'getFeedback');

  //     render(
  //       <MemoryRouter
  //         initialEntries={[
  //           {
  //             pathname: '/study/chat/practice',
  //             state: { topic: 'Topic', question: 'Question', id: 1 },
  //           },
  //         ]}
  //       >
  //         <ChatPracticeContent />
  //       </MemoryRouter>
  //     );

  //     // Act: 텍스트를 입력하고 'send' 버튼 클릭
  //     const input = screen.getByRole('textbox');
  //     fireEvent.change(input, { target: { value: 'Sample answer' } });

  //     const sendButton = screen.getByAltText('send');
  //     fireEvent.click(sendButton);

  //     // Assert: getFeedback 호출 여부 확인
  //     await waitFor(() => {
  //       expect(getFeedbackSpy).toHaveBeenCalled();
  //     });
  //     await waitFor(() => {
  //       expect(getFeedbackSpy).toHaveBeenCalledWith(
  //         expect.objectContaining({
  //           topic: 'Topic',
  //           currentQuestion: 'Question',
  //           answerInput: 'Sample answer',
  //           questionClass: 'main',
  //         })
  //       );
  //     });
  //   });

  //   test('API 호출 순서 검증', async () => {
  //     const getFeedbackSpy = jest.spyOn(require('../../api/ai_api'), 'getFeedback');
  //     const getAudioFeedbackSpy = jest.spyOn(require('../../api/ai_api'), 'getAudioFeedback');

  //     render(
  //       <MemoryRouter
  //         initialEntries={[
  //           {
  //             pathname: '/study/chat/practice',
  //             state: { topic: 'Topic', question: 'Question', id: 1 },
  //           },
  //         ]}
  //       >
  //         <ChatPracticeContent />
  //       </MemoryRouter>
  //     );

  //     // 초기 렌더링 후 API 호출 확인
  //     expect(getSubQuestion).toHaveBeenCalled();

  //     // mic 버튼 클릭 후 stop 버튼 활성화
  //     const micButton = screen.getByAltText('mic');
  //     fireEvent.click(micButton);

  //     // stop 버튼 클릭 후 send 버튼 활성화
  //     const stopButton = screen.getByAltText('stop');
  //     fireEvent.click(stopButton);

  //     // send 버튼 클릭 후 API 호출 확인
  //     const sendButton = screen.getByAltText('send');
  //     fireEvent.click(sendButton);

  //     // waitFor를 사용하여 getAudioFeedback 호출 확인
  //     await waitFor(() => {
  //       expect(getAudioFeedbackSpy).toHaveBeenCalled();
  //     });

  //     // waitFor를 사용하여 getFeedback 호출 확인
  //     await waitFor(() => {
  //       expect(getFeedbackSpy).toHaveBeenCalled();
  //     });
  //   });

  //   test('버튼 상태 변화 확인', async () => {
  //     render(
  //       <MemoryRouter
  //         initialEntries={[
  //           {
  //             pathname: '/study/chat/practice',
  //             state: { topic: 'Topic', question: 'Question', id: 1 },
  //           },
  //         ]}
  //       >
  //         <ChatPracticeContent />
  //       </MemoryRouter>
  //     );

  //     // 버튼의 computed style을 얻기 위해 getComputedStyle을 사용
  //     const micButton = screen.getByAltText('mic');
  //     const stopButton = screen.getByAltText('stop');
  //     const sendButton = screen.getByAltText('send');

  //     const micButtonStyle = window.getComputedStyle(micButton);
  //     const stopButtonStyle = window.getComputedStyle(stopButton);
  //     const sendButtonStyle = window.getComputedStyle(sendButton);

  //     // 초기 상태: mic 버튼만 활성화되어 있어야 함
  //     expect(micButtonStyle.opacity).toBe('1');
  //     expect(stopButtonStyle.opacity).toBe('0.3');
  //     expect(sendButtonStyle.opacity).toBe('0.3');

  //     // mic 버튼 클릭 후 stop 버튼이 활성화되어야 함
  //     fireEvent.click(micButton);
  //     await waitFor(() => {
  //       const updatedStopButtonStyle = window.getComputedStyle(stopButton);
  //       expect(updatedStopButtonStyle.opacity).toBe('1');
  //     });

  //     // stop 버튼 클릭 후 send 버튼이 활성화되어야 함
  //     fireEvent.click(stopButton);
  //     await waitFor(() => {
  //       const updatedSendButtonStyle = window.getComputedStyle(sendButton);
  //       expect(updatedSendButtonStyle.opacity).toBe('1');
  //     });

  //     // send 버튼 클릭 후 mic 버튼만 활성화되어야 함
  //     fireEvent.click(sendButton);

  //     getAudioFeedback.mockResolvedValue({
  //       status: 200,
  //       data: { score: '4.1', text: '친구랑 같이 운동하면 더 힘이 나!' },
  //     });
  //     getFeedback.mockResolvedValue({
  //       status: 200,
  //       data: '간단하게라도 이유를 말해주면 대화가 더 흥미로워질 수 있어요.',
  //     });

  //     await waitFor(() => {
  //       const updatedMicButtonStyle = window.getComputedStyle(micButton);
  //       expect(updatedMicButtonStyle.opacity).toBe('1');
  //     });
  //   });

  test('마지막 대화 렌더링 후 학습 완료 텍스트 렌더링', async () => {
    const mockQuestions = [{}, {}, {}];
    const mockIndex = mockQuestions.length;

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/study/chat/practice',
            state: { topic: 'Topic', question: 'Question', id: 1 },
          },
        ]}
      >
        <ChatPracticeContent questions={mockQuestions} currentQuestionIndex={mockIndex} />
      </MemoryRouter>
    );

    const finishMessage = await screen.findByText('학습 완료!');
    expect(finishMessage).toBeInTheDocument();
  });
});
