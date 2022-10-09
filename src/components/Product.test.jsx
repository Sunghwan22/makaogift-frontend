import { render, screen, waitFor } from '@testing-library/react';
import { productStore } from '../stores/ProductStore';
import Product from './Product';

const navigate = jest.fn();

jest.mock('usehooks-ts', () => ({
  useLocalStorage() {
    return {
      accessToken: 'accessToken',
    };
  },
}));

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

test('Product detail', async () => {
  await productStore.fetchProduct(1);

  render(<Product />);

  screen.getByText('선물하기');

  waitFor(() => {
    screen.getByText(/총 상품금액:1,500,000원/);
  });
});
