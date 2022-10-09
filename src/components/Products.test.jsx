import { render, screen, waitFor } from '@testing-library/react';
import { productStore } from '../stores/ProductStore';
import Products from './Products';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

test('Products', async () => {
  productStore.fetchProducts();

  render(<Products />);

  screen.getByText(/상품이 존재하지 않습니다/);

  await waitFor(() => {
    screen.getByText(/1,500,000원/);
  });
});
