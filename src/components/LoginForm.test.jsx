import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import LoginForm from './LoginForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

test('LoginForm', async () => {
  render(<LoginForm />);

  // screen.getByRole('heading', { name: '로그인하기' });

  fireEvent.change(screen.getByLabelText('아이디'), {
    target: { value: 'tidls45' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호'), {
    target: { value: 'Tjdghks245@' },
  });

  fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

  await waitFor(() => {
    expect(navigate).toBeCalledWith('/');
  });
});
