/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  height: 90vh;
  min-height: 100%;
  width: 30vw;
  padding-left: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  div {
    width: 25vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1em;
  }
`;

const H2 = styled.h2`
   display: flex;
   justify-content: center;
   width: 15vw;
   font-size: 1.5em;
   padding-top: 1em;
   padding-right: 2em;
   padding-left: 2em;
   padding-bottom: .3em;
   border-bottom: solid 1px #22DAAB;
   margin-bottom: 1em;
`;

const Error = styled.p`
   font-size : .5em;
   color: red;
   margin-top: .5em;
`;

const Input = styled.input`
   border: ${(props) => (props.error ? '1px solid #F00' : '1px solid#CCC')}; 
   outline: none;
   padding: 0.5em;
   margin-bottom: .4em;
`;

const Label = styled.label`
   font-size: .3em;
   margin-bottom: .6em;
   color: #A0A0A0;
   font-weight: bold;
`;

const Guide = styled.p`
  font-size: .3em;
  color: #A0A0A0;
`;

const SignupButton = styled.button`
  font-size: .7em;
  color: white;
  background: #22DAAB;
  margin-top: 1em;
  padding : 1em;
  border: none;
  border-radius: .5em;
  cursor: pointer;
`;

export default function SignupForm() {
  const navigate = useNavigate();

  const userStore = useUserStore();

  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

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
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <H2>SIGN UP</H2>
        <div>
          <Label htmlFor="input-name">이름</Label>
          <Input
            id="input-name"
            {...register(
              'name',
              {
                required: { value: true, message: '이름을 입력해주세요' },
                pattern: { value: /^[ㄱ-ㅎ|가-힣]{3,7}$/, message: '이름을 다시 확인해주세요' },
              },
            )}
            error={errors.name}
          />
          {errors.name ? (
            <Error>{errors.name.message}</Error>
          )
            : <Guide>3~7자까지 한글만 사용 가능</Guide>}
        </div>
        <div>
          <Label htmlFor="input-identifier">아이디</Label>
          <Input
            id="input-identifier"
            {...register(
              'identifier',
              {
                required: { value: true, message: '아이디를 입력해주세요' },
                pattern: { value: /^[a-z0-9]{4,16}$/, message: '아이디를 다시 확인해주세요' },
              },
            )}
            error={errors.identifier}
          />
          {userStore.errorMessage === '해당 아이디는 사용할 수 없습니다' ? (
            <Error>{userStore.errorMessage}</Error>
          ) : errors.identifier ? (
            <Error>{errors.identifier.message}</Error>
          )
            : <Guide>영문소문자/숫자, 4~16자만 사용 가능</Guide>}
        </div>
        <div>
          <Label htmlFor="input-password">비밀번호</Label>
          <Input
            id="input-password"
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
            error={errors.password}
          />
          {errors.password ? (
            <Error>{errors.password.message}</Error>
          )
            : <Guide>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 합니다</Guide>}
        </div>
        <div>
          <Label htmlFor="input-confirm-password">비밀번호 확인</Label>
          <Input
            id="input-confirm-password"
            {...register(
              'confirmPassword',
              {
                required: { value: true, message: '비밀번호를 입력해주세요' },
                validate: (value) => value === watch('password'),
                message: '비밀번호가 일치하지 않습니다',
              },
            )}
            error={errors.confirmPassword}
          />
          {errors.confirmPassword === '비밀번호를 입력해주세요' ? (
            <Error>{errors.confirmPassword.message}</Error>
          ) : errors.confirmPassword ? (
            <Error>비밀번호가 일치하지 않습니다</Error>
          ) : null}
        </div>
        <div>
          <SignupButton
            type="submit"
            name="submit-button"
          >
            회원가입
          </SignupButton>
        </div>
      </form>
    </Container>
  );
}
