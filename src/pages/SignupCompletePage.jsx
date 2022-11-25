import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 90vh;
  min-height: 100%;
  width: 24vw;
  padding-left: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
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


  &:hover{  
    color : #006148
  }

  button:active{
  background:#008C68;
}
`;

const H2 = styled.h2`
  text-align: center;
  font-size: 1.3em;
  padding-bottom: 1.2em;
`;

const Guide = styled.p`
  text-align: center;
  font-size: .8em;
  color: #444444;
  padding-bottom: 1.5em;
`;

export default function SignupCompletePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <Container>
      <H2>회원가입 완료</H2>
      <Guide>
        마카오 선물하기 회원가입이 완료되었습니다
        <br />
        정상적인 서비스 이용을 위해 로그인을 진행해주세요
      </Guide>
      <LoginButton
        type="button"
        onClick={handleClick}
      >
        로그인하기
      </LoginButton>
    </Container>
  );
}
