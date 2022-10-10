import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import Image from '../assets/image3.png';
import LoginImage from '../assets/image4.jpeg';

const Container = styled.div`
  width: 100vw;
  background: yellow;  
  height: 30vh;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-image: ${(props) => (props.accessToken ? `url(${LoginImage})` : `url(${Image})`)};
  background-size: cover;

  div {
    padding-left: 12em;
  }

  p {
    font-size: .8em;
  }

  h2 {
    font-weight: bold;
    padding-top: 1em;
    padding-bottom: 1em;
  }
`;

const Question = styled.p`
  color: #F3A300;
`;

export default function ProductHeader() {
  const [accessToken] = useLocalStorage('accessToken', '');

  return (
    <Container
      accessToken={accessToken}
    >
      <div>
        <Question>평범한 선물은 주기도 민망하다구요?</Question>
        <h2>
          작정하고 준비한
          <br />
          마카오톡 선물하기 아이템
        </h2>
        <p>
          마카오톡 선물하기에서만 볼 수 있는 특별한 기획전
        </p>
      </div>
    </Container>
  );
}
