import { render, screen } from '@testing-library/react';
import Products from './Products';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

let products;
let pageNumbers;

jest.mock('../hooks/useProductStore', () => () => ({
  products,
  pageNumbers,
}));

const context = describe;

describe('ProductList', () => {
  context('상품이 없는 경우', () => {
    beforeEach(() => {
      products = [];
      pageNumbers = [];
    });

    it('주문 내역이 없을때 안내메시지', () => {
      render(<Products />);

      screen.getByText('상품이 존재하지 않습니다');
    });
  });

  context('상품내역이 있는 경우', () => {
    beforeEach(() => {
      products = [
        {
          id: 1,
          company: '애플',
          name: '아이폰14',
          price: 1500000,
          description: '아이폰 14의 놀라운 혁신',
        },
        {
          id: 2,
          maker: '인사이트',
          name: 'The Pragmatic Programmer',
          price: 200,
          description: '20주년 기념판',
        },
        {
          id: 3,
          maker: '인사이트',
          name: 'Test-Driven Development',
          price: 300,
          description: 'By Example',
        },
      ];
      pageNumbers = [1];
    });

    it('상품을 확인할 수 있다', () => {
      render(<Products />);

      screen.getByText('인기선물을 한 자리에 모았어요');

      screen.getByText(/아이폰14/);
      screen.getByText('1,500,000원');
      screen.getByText('300원');
    });
  });
});
