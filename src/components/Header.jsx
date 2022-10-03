import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;

    ul{
        display: flex;
        
    }

    li{
        padding-right: 1em;
    }
`;

export default function Header() {
  return (
    <Container>
      <nav>
        <ul>
          <li>
            <Link to="/">선물하기</Link>
          </li>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/">스토어</Link>
          </li>
          <li>
            <Link to="/">주문조회</Link>
          </li>
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
