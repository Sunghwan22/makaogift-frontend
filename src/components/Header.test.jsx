import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('Header', () => {
  function renderHeader() {
    render(
      <Header />,
    );
  }

  it('renders "store" link', () => {
    renderHeader();

    screen.getByText('스토어');
  });

  context('로그인 한 상태', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
    });

    it('로그아웃 버튼', () => {
      renderHeader();

      screen.getByText(/내 잔액/);
      fireEvent.click(screen.getByText('로그아웃'));
      expect(navigate).toBeCalledWith('/');
    });
  });

  context('로그인을 안한 상태', () => {
    beforeEach(() => {
      localStorage.removeItem('accessToken');
    });

    it('로그인 버튼', () => {
      renderHeader();

      screen.getByText('회원가입');
      screen.getByText('로그인');
    });
  });
});
