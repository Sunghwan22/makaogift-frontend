import { render, screen } from '@testing-library/react';
import OrderDetailPage from './OrderDetailPage';

let orderHistoryId;

const context = describe;

jest.mock('react-router-dom', () => ({
  useParams() {
    return orderHistoryId;
  },
}));

let orderHistory;
const fetchOrderHistory = jest.fn();

jest.mock('../hooks/useOrderStore', () => () => ({
  orderHistory,
  fetchOrderHistory,
}));

describe('OrderDetailPage', () => {
  context('param으로 상세 내역 id가 주어짐', () => {
    beforeEach(() => {
      orderHistoryId = 1;
      orderHistory = {
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
      };
    });

    it('주문 내역 내용이 화면에 출력', () => {
      render(<OrderDetailPage />);

      screen.getByText(/1,500,000원/);
      screen.getByText('울산광역시');
    });

    it('OrderStore의 함수 호출', () => {
      render(<OrderDetailPage />);

      expect(fetchOrderHistory).toBeCalled();
    });
  });
});
