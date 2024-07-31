import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('초기 시작 화면 렌더링', () => {
    render(<App />);
    expect(screen.getByText('언어 학습을 통한 사회적 연결')).toBeInTheDocument();
  });
});
