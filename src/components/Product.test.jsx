import {
  fireEvent, render, screen,
} from '@testing-library/react';
import Product from './Product';

const navigate = jest.fn();
const fetchProduct = jest.fn();
const addQuantity = jest.fn();
const reduceQuantity = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
  useLocation: () => ({
    state: {
      product: {
        id: 1,
        company: '애플',
        name: '아이폰14',
        price: 1500000,
        description: '아이폰 14의 놀라운 혁신',
      },
      quantity: 1,
      totalPrice: 1500000,
    },
  }),
}));

jest.mock('../hooks/useProductStore', () => () => ({
  fetchProduct,
  product: {
    id: 1,
    company: '애플',
    name: '아이폰14',
    price: 1500000,
    description: '아이폰 14의 놀라운 혁신',
  },
  reduceQuantity,
  addQuantity,
  quantity: 1,
  totalPrice: 1500000,
}));

let amount;

jest.mock('../hooks/useUserStore', () => () => ({
  amount,
}));

const context = describe;

describe('ProductDetail', () => {
  context('로그인 상태에서 주문하기', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
      amount = 5_000_000;
    });

    it('주문하기 성공', () => {
      render(<Product />);

      screen.getByText('애플');

      fireEvent.click(screen.getByText('+'));

      expect(addQuantity).toBeCalledTimes(1);

      // screen.getByText(/3,000,000/);

      fireEvent.click(screen.getByRole('button', { name: '선물하기' }));

      expect(navigate).toBeCalledWith(
        '/order',
        {
          state: {
            product: {
              id: 1,
              company: '애플',
              name: '아이폰14',
              price: 1500000,
              description: '아이폰 14의 놀라운 혁신',
            },
            quantity: 1,
            totalPrice: 1500000,
          },
        },
      );
    });
  });
});
