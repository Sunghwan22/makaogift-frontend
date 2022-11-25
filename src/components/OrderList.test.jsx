import { render, screen } from '@testing-library/react';
import OrderList from './OrderList';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

let orderHistories;
let pageNumbers;

jest.mock('../hooks/useOrderStore', () => () => ({
  orderHistories,
  pageNumbers,
}));

const context = describe;

describe('OrderHistories', () => {
  context('주문내역이 없는 경우', () => {
    beforeEach(() => {
      orderHistories = [];
      pageNumbers = [];
    });

    it('주문 내역이 없을때 안내메시지', () => {
      render(<OrderList />);

      screen.getByText('주문내역이 없습니다');
    });
  });

  context('주문내역이 있는 경우', () => {
    beforeEach(() => {
      orderHistories = [
        {
          id: 1,
          identifier: 'tidls45',
          productName: '아이폰14',
          company: '애플',
          description: '갖고 싶다',
          totalPrice: 1500000,
          quantity: 1,
          name: '문진상진상',
          address: '울산광역시',
          message: '돌려줄땐 15로',
          createdAt: '2022-10-13',
        },
        {
          id: 2,
          identifier: 'tidls45',
          productName: '갤럭시S22',
          company: '삼성전자',
          description: '갖고 싶다',
          totalPrice: 15000000,
          quantity: 1,
          name: '누구주냐',
          address: '울산광역시',
          message: '돌려줄땐 15로',
          createdAt: '2022-10-13',
        },
      ];
      pageNumbers = [1];
    });

    it('주문 내역을 확인할 수 있다', () => {
      render(<OrderList />);

      screen.getByText('내가 주문한 내역입니다');
      screen.getByText('To. 문진상진상');
      screen.getByText('애플');
      screen.getByText('아이폰14');
      screen.getByText('1');
    });
  });
});
