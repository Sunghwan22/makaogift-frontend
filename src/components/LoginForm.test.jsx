import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import LoginForm from './LoginForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
  useLocation: () => ({
    state: 1,
  }),
}));

const context = describe;

describe('LoginForm', () => {
  context('올바른 로그인', () => {
    it('로그인 성공', async () => {
      render(<LoginForm />);

      screen.getByText('USER LOGIN');

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'tidls45' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Tjdghks245@' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/');
      });
    });
  });

  context('아이디가 틀린 경우', () => {
    it('로그인 실패', async () => {
      render(<LoginForm />);

      screen.getByText('USER LOGIN');

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'tidls6846' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Tjdghks245@' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

      waitFor(() => {
        screen.getByText('아이디 혹은 비밀번호가 맞지 않습니다');
      });
    });
  });

  context('비밀번호가 틀린 경우', () => {
    it('로그인 실패', async () => {
      render(<LoginForm />);

      screen.getByText('USER LOGIN');

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'tidls45' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Tjdghks245@@@@@@' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

      waitFor(() => {
        screen.getByText('아이디 혹은 비밀번호가 맞지 않습니다');
      });
    });
  });
});
