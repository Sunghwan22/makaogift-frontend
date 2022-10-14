import { waitFor } from '@testing-library/react';
import ProductStore from './ProductStore';

const context = describe;

describe('ProductStore', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  describe('물품 목록 확인', () => {
    context('상품 목록이 있을 때', () => {
      it('1페이즈의 상품 목록을 불러옴', async () => {
        await productStore.changePageNumber(1);

        waitFor(() => {
          expect(productStore.products).toStrictEqual(
            [
              {
                id: 1,
                company: '애플',
                name: '아이폰14',
                price: 1500000,
                description: '아이폰 14의 놀라운 혁신',
              },
              {
                id: 2,
                maker: '인사이트',
                name: 'The Pragmatic Programmer',
                price: 200,
                description: '20주년 기념판',
              },
              {
                id: 3,
                maker: '인사이트',
                name: 'Test-Driven Development',
                price: 300,
                description: 'By Example',
              },
            ],
          );
        });
      });
    });

    context('상품 2페이지를 불러옴', () => {
      it('page가 2일 때 2페이즈의 상품을 보여줌', async () => {
        await productStore.changePageNumber(1);

        waitFor(() => {
          expect(productStore.products).toStrictEqual([
            {
              id: 9,
              company: '애플',
              name: '아이폰14',
              price: 1500000,
              description: '아이폰 14의 놀라운 혁신',
            },
            {
              id: 10,
              maker: '인사이트',
              name: 'The Pragmatic Programmer',
              price: 200,
              description: '20주년 기념판',
            },
            {
              id: 11,
              maker: '인사이트',
              name: 'Test-Driven Development',
              price: 300,
              description: 'By Example',
            },
          ]);
        });
      });
    });

    describe('주문 상세내역', () => {
      context('id=1인 주문내역을 클릭', () => {
        waitFor(() => {
          expect(productStore.fetchProduct(1)).toStrictEqual(
            {
              id: 10,
              maker: '인사이트',
              name: 'The Pragmatic Programmer',
              price: 200,
              description: '20주년 기념판',
            },
          );
        });
      });
    });
  });
});
