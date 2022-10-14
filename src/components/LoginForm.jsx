/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';
import { apiService } from '../services/ApiService';

const Container = styled.div`
  height: 90vh;
  min-height: 100%;
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
   width: 15.5vw;
   font-size: 1.5em;
   padding-right: 2em;
   padding-left: 2em;
   padding-bottom: .3em;
   border-bottom: solid 1px #22DAAB;
   margin-bottom: 1.5em;
`;

const Error = styled.p`
   font-size : .5em;
   color: red;
   margin-top: .5em;
`;

const Input = styled.input`
   border: ${(props) => (props.error ? '1px solid #F00' : '1px solid#CCC')}; 
   outline: none;
   padding: 0.7em;
`;

const Label = styled.label`
   display: none;
`;

const Signup = styled.button`
  font-size: .7em;
  background: transparent;
  padding : 1em;
  border: none;
  border-radius: .5em;
  cursor: pointer;
`;

const LoginButton = styled.button`
  font-size: .7em;
  color: white;
  background: #22DAAB;
  margin-top: 1em;
  padding : 1em;
  border: none;
  border-radius: .5em;
  cursor: pointer;
`;

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
    }

    if (productId) {
      navigate(`/products/${productId}`);
    }
  };

  const handleClickSignUp = () => {
    navigate('/signup');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <H2>USER LOGIN</H2>
        <div>
          <Label htmlFor="input-identifier">아이디</Label>
          <Input
            id="input-identifier"
            {...register('identifier', {
              required: {
                value: true, message: '아이디를 입력해주세요',
              },
            })}
            placeholder="아이디"
            error={errors.identifier}
          />
        </div>
        <div>
          <Label htmlFor="input-password">비밀번호</Label>
          <Input
            id="input-password"
            {...register('password', {
              required: {
                value: true, message: '비밀번호를 입력해주세요',
              },
            })}
            placeholder="비밀번호"
            type="password"
            error={errors.password}
          />
        </div>
        {errors.identifier ? (
          <Error>{errors.identifier.message}</Error>
        )
          : errors.password ? (
            <Error>{errors.password.message}</Error>
          )
            : userStore.errorMessage === '아이디 혹은 비밀번호가 맞지 않습니다' ? (
              <Error>{userStore.errorMessage}</Error>
            )
              : null}
        <div>
          <LoginButton type="submit">
            로그인하기
          </LoginButton>
        </div>
        <div>
          <Signup
            type="button"
            onClick={handleClickSignUp}
          >
            회원가입
          </Signup>
        </div>
      </form>
    </Container>
  );
}
