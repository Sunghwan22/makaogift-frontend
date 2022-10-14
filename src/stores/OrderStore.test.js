import { waitFor } from '@testing-library/react';
import { apiService } from '../services/ApiService';
import OrderStore from './OrderStore';

const context = describe;

describe('OrderStore', () => {
  let orderStore;

  beforeEach(() => {
    orderStore = new OrderStore();
  });

  describe('주문 내역 확인', () => {
    context('상품 주문', () => {
      it('정상적인 상품 주문', async () => {
        apiService.setAccessToken('ACCESS.TOKEN');

        await orderStore.requestPresent(1, 1, 299000, '문디', '울산광역시', '니도 가온나');

        waitFor(() => {
          expect(orderStore.amount).toBe(299000);
        });
      });
    });

    context('주문 내역이 있을 때', () => {
      it('주문내역 2건 , 1페이지', async () => {
        const accessToken = 'ACCESS.TOKEN';

        apiService.setAccessToken(accessToken);

        await orderStore.fetchOrderHistories(accessToken);

        expect(orderStore.orderHistories).toBeTruthy();
        expect(orderStore.pageNumbers).toBeTruthy();
      });
    });

    context('주문 내역이 없을 때', () => {
      it('주문한 상품이 없습니다', async () => {
        const accessToken = 'ACCESS.TOKEN222';

        apiService.setAccessToken(accessToken);

        await orderStore.fetchOrderHistories(accessToken);

        expect(orderStore.orderHistories).toStrictEqual([]);
        expect(orderStore.pageNumbers).toStrictEqual([]);
      });
    });

    context('페이지 변경', () => {
      it('2페이지를 클릭함 ', async () => {
        const accessToken = 'ACCESS.TOKEN';

        apiService.setAccessToken(accessToken);

        await orderStore.changePageNumber(accessToken, 2);

        waitFor(() => {
          expect(orderStore.orderHistories).toStrictEqual([
            {
              id: 9,
              identifier: 'tidls45',
              productName: '아이폰14',
              company: '애플',
              description: '갖고 싶다',
              totalPrice: 15000000,
              quantity: 1,
              name: '이상균',
              address: '울산광역시',
              message: '돌려줄땐 15로',
              createdAt: '2022-10-13',
            },
            {
              id: 10,
              identifier: 'tidls45',
              productName: '아이폰14',
              company: '애플',
              description: '갖고 싶다',
              totalPrice: 15000000,
              quantity: 1,
              name: '문디',
              address: '울산광역시',
              message: '돌려줄땐 15로',
              createdAt: '2022-10-13',
            },
          ]);
          expect(orderStore.pageNumbers).toBeTruthy();
        });
      });
    });

    describe('주문 상세내역', () => {
      context('id=1인 주문내역을 클릭', () => {
        const accessToken = 'ACCESS.TOKEN';

        apiService.setAccessToken(accessToken);

        waitFor(() => {
          expect(orderStore.fetchOrderHistory(1)).toStrictEqual(
            {
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
            },
          );
        });
      });
    });
  });
});
