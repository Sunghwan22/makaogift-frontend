import { render } from '@testing-library/react';
import ProductPage from './ProductPage';

const navigate = jest.fn();
const fetchProduct = jest.fn();
const addQuantity = jest.fn();
const reduceQuantity = jest.fn();
const resetQntityAndTotalPrice = jest.fn();
const resetErrorMessage = jest.fn();

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
  useParams() {
    return 1;
  },
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
  resetQntityAndTotalPrice,
  resetErrorMessage,
  quantity: 1,
  totalPrice: 1500000,
}));

let amount;

jest.mock('../hooks/useUserStore', () => () => ({
  amount,
}));

test('ProductPage', () => {
  render(<ProductPage />);
});
