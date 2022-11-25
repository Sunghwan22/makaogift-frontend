import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import OrderForm from './OrderForm';

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

const context = describe;
describe('OrderForm', () => {
  context('orderWith Correct Information', () => {
    it('orderSuccess', () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

      render(<OrderForm />);

      fireEvent.change(screen.getByLabelText('받는 분 성함'), {
        target: { value: '문디야' },
      });

      fireEvent.change(screen.getByLabelText('받는 분 주소'), {
        target: { value: '울산광역시' },
      });

      fireEvent.change(screen.getByLabelText('받는 분께 보내는 메시지'), {
        target: { value: '니도 가온나' },
      });

      fireEvent.click(screen.getByRole('button', { name: '선물하기' }));

      waitFor(() => {
        expect(navigate).toBeCalledWith('/orders');
      });
    });
  });

  context('orderWith InCorrect Information', () => {
    it('orderFailed', () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

      render(<OrderForm />);

      fireEvent.change(screen.getByLabelText('받는 분 성함'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('받는 분 주소'), {
        target: { value: '울산광역시' },
      });

      fireEvent.change(screen.getByLabelText('받는 분께 보내는 메시지'), {
        target: { value: '니도 가온나' },
      });

      fireEvent.click(screen.getByRole('button', { name: '선물하기' }));

      waitFor(() => {
        screen.getByText('성함을 입력해주세요');
      });
    });
  });

  context('orderWith InCorrect name', () => {
    it('orderFailed', () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

      render(<OrderForm />);

      fireEvent.change(screen.getByLabelText('받는 분 성함'), {
        target: { value: 'asdasdasdasd' },
      });

      fireEvent.change(screen.getByLabelText('받는 분 주소'), {
        target: { value: '울산광역시' },
      });

      fireEvent.change(screen.getByLabelText('받는 분께 보내는 메시지'), {
        target: { value: '니도 가온나' },
      });

      fireEvent.click(screen.getByRole('button', { name: '선물하기' }));

      waitFor(() => {
        screen.getByText('성함을 다시 확인해주세요');
      });
    });
  });

  context('orderWith InCorrect Information', () => {
    it('주소를 입력하지 않았을 때', () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

      render(<OrderForm />);

      fireEvent.change(screen.getByLabelText('받는 분 성함'), {
        target: { value: '문디야' },
      });

      fireEvent.change(screen.getByLabelText('받는 분 주소'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('받는 분께 보내는 메시지'), {
        target: { value: '니도 가온나' },
      });

      fireEvent.click(screen.getByRole('button', { name: '선물하기' }));

      waitFor(() => {
        screen.getByText('주소를 입력해주세요');
      });
    });
  });
});
