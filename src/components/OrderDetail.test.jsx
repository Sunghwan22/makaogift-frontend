import { render, screen } from '@testing-library/react';
import OrderDetail from './OrderDetail';

const context = describe;

describe('주문 상세 내역', () => {
  context('상품 목록을 클릭', () => {
    const orderHistory = {
      id: 10,
      identifier: 'tidls45',
      productName: '트렌치코트',
      company: '드러그옴므',
      description: '갖고 싶다',
      totalPrice: 299000,
      quantity: 1,
      name: '문디',
      address: '울산광역시',
      message: '돌려줄땐 15로',
      createdAt: '2022-10-13',
    };

    it('해당 내용이 출력이 되는 가', () => {
      render(
        <OrderDetail
          orderHistory={orderHistory}
        />,
      );

      screen.getByText(/트렌치코트/);
      screen.getByText(/드러그옴므/);
      screen.getByText(/299,000/);
      screen.getByText('1');
      screen.getByText(/문디/);
      screen.getByText(/울산광역시/);
      screen.getByText(/돌려줄땐 15로/);
      screen.getByText(/2022-10-13/);
    });
  });
});
