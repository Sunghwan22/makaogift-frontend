import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
  useLocation: () => ({
    state: 1,
  }),
}));
test('LoginPage', () => {
  render(<LoginPage />);

  screen.getByText('USER LOGIN');
  screen.getByText('로그인하기');
  screen.getByText('회원가입');
});
