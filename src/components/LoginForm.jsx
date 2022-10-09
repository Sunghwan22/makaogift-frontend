/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';
import { apiService } from '../services/ApiService';

export default function LoginForm() {
  const navigate = useNavigate();

  const userStore = useUserStore();

  const location = useLocation();

  const productId = location.state;

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { identifier, password } = data;
    const accessToken = await userStore.login({ identifier, password });

    if (accessToken) {
      setAccessToken(accessToken);
      apiService.setAccessToken(accessToken);
      navigate('/');
      // todo 여기서 fetch
    }

    if (productId) {
      navigate(`/products/${productId}`);
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
            {...register('identifier', {
              required: {
                value: true, message: '아이디를 입력해주세요',
              },
            })}
            placeholder="아이디"
          />
        </div>
        <div>
          <label htmlFor="input-password">비밀번호</label>
          <input
            id="input-password"
            {...register('password', {
              required: {
                value: true, message: '비밀번호를 입력해주세요',
              },
            })}
            placeholder="비밀번호"
            type="password"
          />
        </div>
        {errors.identifier ? (
          <p>{errors.identifier.message}</p>
        )
          : errors.password ? (
            <p>{errors.password.message}</p>
          )
            : userStore.errorMessage === '아이디 혹은 비밀번호가 맞지 않습니다' ? (
              <p>{userStore.errorMessage}</p>
            )
              : null}
        <button type="submit">
          로그인하기
        </button>
      </form>
    </div>
  );
}
