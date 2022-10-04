import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';

import numberFormat from '../utils/NumberFormat';

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
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  const [amount, setAmount] = useLocalStorage('amount', '');

  const navigate = useNavigate();
  // 지금 영속성 구현이 안되있구나 amount를 구현 시켜야 겠내
  const handleLogout = () => {
    setAccessToken('');
    setAmount('');
    navigate('/');
  };

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
            <Link to="/products">스토어</Link>
          </li>
          <li>
            <Link to="/">주문조회</Link>
          </li>
          {accessToken ? (
            <div>
              <p>
                내 잔액:
                {' '}
                {numberFormat(amount)}
                원
              </p>
              <button
                type="button"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <ul>
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
              <li>
                <Link to="/login">로그인</Link>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </Container>
  );
}
