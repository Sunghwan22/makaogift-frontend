import { render, screen } from '@testing-library/react';
import SignupPage from './SignupPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
  useLocation: () => ({
    state: 1,
  }),
}));
test('SignupPage', () => {
  render(<SignupPage />);

  screen.getByText('SIGN UP');
  screen.getByText('회원가입');
});
