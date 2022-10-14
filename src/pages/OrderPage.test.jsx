import { render, screen } from '@testing-library/react';
import OrderPage from './OrderPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
  useLocation: () => ({
    state: {
      product: {
        id: 1,
        company: '드러그옴므',
        name: '트렌치코트',
        price: 299000,
        description: '갖고 싶다',
      },
      quantity: 1,
      totalPrice: 1500000,
    },
  }),
}));

test('OrderPage', () => {
  render(<OrderPage />);

  screen.getByText('드러그옴므');
  screen.getByText('트렌치코트');
});
