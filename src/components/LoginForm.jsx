/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import useUserStore from '../hooks/useUserStore';

export default function LoginForm() {
  const userStore = useUserStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { id, password } = data;
    const accessToken = await userStore.login({ id, password });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="input-id">아이디</label>
          <input
            id="input-id"
            {...register('id', { required: true })}
            placeholder="아이디"
          />
        </div>
        <div>
          <label htmlFor="input-password">비밀번호</label>
          <input
            id="input-password"
            {...register('password', { required: true })}
            placeholder="비밀번호"
          />
        </div>
        {errors.id ? (
          <p>아이디를 입력해주세요</p>
        ) : null}
        {errors.password ? (
          <p>비밀번호를 입력해주세요</p>
        ) : null}
        <button type="submit">
          로그인하기
        </button>
      </form>
    </div>
  );
}
