import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import SignupForm from './SignupForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

test('SignUp', async () => {
  render(<SignupForm />);

  fireEvent.change(screen.getByLabelText('이름'), {
    target: { value: '제로콜라' },
  });

  fireEvent.change(screen.getByLabelText('아이디'), {
    target: { value: 'tidls45' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호'), {
    target: { value: 'Tjdghks245@' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
    target: { value: 'Tjdghks245@' },
  });

  fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

  await waitFor(() => {
    expect(navigate).toBeCalledWith('/signupcomplete');
  });
});
