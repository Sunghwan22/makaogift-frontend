import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';
import { apiService } from '../services/ApiService';

import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
    display: flex;
    height: 5vh;
    padding-bottom: .2em;
    border-bottom: 1px solid #d3d3d3;
    
    li{
        padding-right: 1em;
        list-style: none;
        font-size: .7em;
    }
    
    a {
      text-decoration: none;
      color: black;
    }
`;

const MenuList = styled.li`
 a{
   text-decoration: none;
   cursor: pointer;

       &:focus , &:hover, &:visited{
        text-decoration: underline; text-decoration-color: #22DAAB;
        text-underline-position: under;
        text-decoration-thickness: .2em;
       }
    }

  h2{
    font-size: 1.3em;
    font-weight: bold;
  }

    padding-left: 1em;
`;

const Navigation = styled.nav`
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;

  ul{
    display: flex;
    align-items: center;
  }
`;

const LogoutButton = styled.button`
  font-size: .7em;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const Amount = styled.p`
  font-size: .7em;
`;

export default function Header() {
  const userStore = useUserStore();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();
  const handleLogout = () => {
    setAccessToken('');
    apiService.setAccessToken('');
    navigate('/');
  };

  return (
    <Container>
      <Navigation>
        <ul>
          <MenuList>
            <h2>선물하기</h2>
          </MenuList>
          <MenuList>
            <Link to="/">홈</Link>
          </MenuList>
          <MenuList>
            <Link to="/products">스토어</Link>
          </MenuList>
          <MenuList>
            <Link
              to={accessToken ? (
                '/orders'
              ) : '/login'}
            >
              주문조회
            </Link>
          </MenuList>
        </ul>
        {accessToken ? (
          <ul>
            <Amount>
              내 잔액:
              {' '}
              {numberFormat(userStore.amount)}
              원
            </Amount>
            <li>
              <LogoutButton
                type="button"
                onClick={handleLogout}
              >
                로그아웃
              </LogoutButton>
            </li>
          </ul>
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
      </Navigation>
    </Container>
  );
}
