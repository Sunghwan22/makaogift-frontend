import { render, screen } from '@testing-library/react';
import ProductsPage from './ProductsPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,

  useParams() {
    return 1;
  },
}));

let products;
let pageNumbers;
const fetchProducts = jest.fn();

jest.mock('../hooks/useProductStore', () => () => ({
  products,
  pageNumbers,
  fetchProducts,
}));

test('ProductPage', () => {
  products = [];
  pageNumbers = [];

  render(<ProductsPage />);

  screen.getByText('평범한 선물은 주기도 민망하다구요?');
  screen.getByText(/작정하고 준비한/);
  screen.getByText(/마카오톡 선물하기 아이템/);
  screen.getByText('마카오톡 선물하기에서만 볼 수 있는 특별한 기획전');

  expect(fetchProducts).toBeCalled();
});
