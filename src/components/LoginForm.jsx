/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';

export default function LoginForm() {
  const navigate = useNavigate();

  const userStore = useUserStore();

  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const [, setAmount] = useLocalStorage('amount', '');

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { identifier, password } = data;
    const accessToken = await userStore.login({ identifier, password });

    if (accessToken) {
      setAccessToken(accessToken);
      setAmount(userStore.amount);
      navigate('/');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>USER LOGIN</h2>
        <div>
          <label htmlFor="input-identifier">아이디</label>
          <input
            id="input-identifier"
            {...register('identifier')}
            placeholder="아이디"
          />
        </div>
        <div>
          <label htmlFor="input-password">비밀번호</label>
          <input
            id="input-password"
            {...register('password')}
            placeholder="비밀번호"
          />
        </div>
        {userStore.errorMessage === '아이디를 입력해주세요' ? (
          <p>{userStore.errorMessage}</p>
        ) : null}
        {userStore.errorMessage === '비밀번호를 입력해주세요' ? (
          <p>{userStore.errorMessage}</p>
        ) : null}
        {userStore.errorMessage === '아이디 혹은 비밀번호가 맞지 않습니다' ? (
          <p>{userStore.errorMessage}</p>
        ) : null}
        <button type="submit">
          로그인하기
        </button>
      </form>
    </div>
  );
}
