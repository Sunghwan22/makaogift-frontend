/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../hooks/useUserStore';

export default function SignupForm() {
  const navigate = useNavigate();

  const userStore = useUserStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const {
      name, identifier, password, confirmPassword,
    } = data;

    const userName = await userStore.signUp({
      name, identifier, password, confirmPassword,
    });
    console.log(userName);
    if (userName) {
      navigate('/');
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
            {...register('name', { required: /^[가-힣]{3,7}$/ })}
            placeholder="이름"
          />
          {errors.name ? (
            <p>이름을 입력해주세요</p>
          ) : <p>3~7자까지 한글만 사용 가능</p>}
          {userStore.errorMessage === '이름을 다시 확인해주세요' ? (
            <p>{userStore.errorMessage}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="input-identifier">아이디</label>
          <input
            id="input-identifier"
            {...register('identifier', { required: /^[a-z0-9]{4,12}$/ })}
            placeholder="아이디"
          />
          {errors.identifier ? (
            <p>아이디를 입력해주세요</p>
          ) : <p>영문소문자/숫자,4~16자만 사용 가능</p>}
          {userStore.errorMessage === '해당 아이디는 사용할 수 없습니다'
          || userStore.errorMessage === '아이디를 다시 확인해주세요'
            ? (
              <p>{userStore.errorMessage}</p>
            ) : null}
        </div>
        <div>
          <label htmlFor="input-password">비밀번호</label>
          <input
            id="input-password"
            {...register('password', { required: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/ })}
            placeholder="비밀번호"
          />
          {errors.password ? (
            <p>비밀번호를 입력해주세요</p>
          ) : <p>8글자 이상의 영문(대소문자),숫자,특수문자가 모두 포함되어야 함</p>}
          { userStore.errorMessage === '비밀번호를 다시 확인해주세요'
            ? (
              <p>{userStore.errorMessage}</p>
            ) : null}
        </div>
        <div>
          <label htmlFor="input-confirm-password">비밀번호 확인</label>
          <input
            id="input-confirm-password"
            {...register('confirmPassword', { required: true })}
            placeholder="비밀번호 확인"
          />
          {errors.confirmPassword ? (
            <p>비밀번호를 입력해주세요</p>
          ) : null}
          {userStore.errorMessage === '비밀번호가 일치하지 않습니다' ? (
            <p>{userStore.errorMessage}</p>
          ) : (
            null
          )}
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
