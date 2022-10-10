import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';
import GiftImage from '../assets/image5.png';

const Container = styled.div`
  height: 90vh;
  min-height: 100%;
  display: flex;
  padding: 0 15%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  div{
    display: column;
    padding-left: 5em;
    justify-content: flex-start;

   p {
    font-size: 0.7em;
    margin-bottom: 1em;
    }

  h2 {
    font-size: 1.1em;
    margin-bottom: 1em;
  }  
  }
`;

const Introduce = styled.p`
  color: #FCBE2C;
`;

const ImageBox = styled.div`
  position: absolute;
  top: 23%;
  left: 54%;
  width: 60vh;
  height: 50vh;
  background: url(${GiftImage}) no-repeat 0 50%;
  background-size: contain;

`;

export default function HomePage() {
  const userStore = useUserStore();
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    userStore.fetchUser(accessToken);
  }, []);

  return (
    <Container>
      <div>
        <Introduce>무엇을 선물할 지 고민이라면</Introduce>
        <h2>
          특별한
          <br />
          {' '}
          아이템을 전하세요
        </h2>
        <p>마카오 선물하기에서만 볼 수 있는 특별한 아이템</p>
        <ImageBox />
      </div>
    </Container>
  );
}
