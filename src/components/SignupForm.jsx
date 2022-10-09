/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { watch } from 'fs';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../hooks/useUserStore';

export default function SignupForm() {
  const navigate = useNavigate();

  const userStore = useUserStore();

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    const {
      name, identifier, password, confirmPassword,
    } = data;

    const userName = await userStore.signUp({
      name, identifier, password, confirmPassword,
    });

    if (userName) {
      navigate('/signupcomplete');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>SIGN UP</h2>
        <div>
          <label htmlFor="input-name">이름</label>
          <input
            id="input-name"
            placeholder="이름"
            {...register(
              'name',
              {
                required: { value: true, message: '이름을 입력해주세요' },
                pattern: { value: /^[ㄱ-ㅎ|가-힣]{3,7}$/, message: '이름을 다시 확인해주세요' },
              },
            )}
          />
          {errors.name ? (
            <p>{errors.name.message}</p>
          )
            : <p>3~7자까지 한글만 사용 가능</p>}
        </div>
        <div>
          <label htmlFor="input-identifier">아이디</label>
          <input
            id="input-identifier"
            {...register(
              'identifier',
              {
                required: { value: true, message: '아이디를 입력해주세요' },
                pattern: { value: /^[a-z0-9]{4,16}$/, message: '아이디를 다시 확인해주세요' },
              },
            )}
          />
          {userStore.errorMessage === '해당 아이디는 사용할 수 없습니다' ? (
            <p>{userStore.errorMessage}</p>
          ) : errors.userId ? (
            <p>{errors.userId.message}</p>
          )
            : <p>영문소문자/숫자, 4~16자만 사용 가능</p>}
        </div>
        <div>
          <label htmlFor="input-password">비밀번호</label>
          <input
            id="input-password"
            placeholder="비밀번호"
            {...register(
              'password',
              {
                required: { value: true, message: '비밀번호를 입력해주세요' },
                pattern: {
                  value: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
                  message: '비밀번호를 다시 확인해주세요',
                },
              },
            )}
          />
          {errors.password ? (
            <p>{errors.password.message}</p>
          )
            : <p>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 합니다</p>}
        </div>
        <div>
          <label htmlFor="input-confirm-password">비밀번호 확인</label>
          <input
            id="input-confirm-password"
            {...register(
              'confirmPassword',
              {
                required: { value: true, message: '비밀번호를 입력해주세요' },
                validated: {
                  value: (value) => value === watch('password'),
                  message: '비밀번호가 일치하지 않습니다',
                },
              },
            )}
          />
          {userStore.errorMessage === '비밀번호가 일치하지 않습니다' ? (
            <p>{userStore.errorMessage}</p>
          ) : null}
        </div>
        <button
          type="submit"
          name="submit-button"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
