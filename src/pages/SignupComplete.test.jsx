import { fireEvent, render, screen } from '@testing-library/react';
import SignupCompletePage from './SignupCompletePage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

test('SingUpComplete', () => {
  render(<SignupCompletePage />);

  screen.getByText('회원가입 완료');

  fireEvent.click(screen.getByText('로그인하기'));

  expect(navigate).toBeCalledWith('/login');
});
