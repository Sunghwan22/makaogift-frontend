import { render } from '@testing-library/react';
import OrderListPage from './OrderListPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

let orderHistories;
let pageNumbers;
const fetchOrderHistories = jest.fn();

jest.mock('../hooks/useOrderStore', () => () => ({
  fetchOrderHistories,
  orderHistories,
  pageNumbers,
}));

test('OrderListPage', () => {
  orderHistories = [];
  pageNumbers = [];

  render(<OrderListPage />);

  expect(fetchOrderHistories).toBeCalled();
});
