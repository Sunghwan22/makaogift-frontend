import styled from 'styled-components';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/NumberFormat';

const UL = styled.ul`
    display: flex;
`;

export default function Products() {
  const productStore = useProductStore();

  const { products } = productStore;

  if (products.length === 0) {
    return <p>상품이 존재하지 않습니다</p>;
  }

  return (
    <div>
      <p>인기선물을 한 자리에 모았어요</p>
      {/* product는 제조사를가지고 있겠고 상품 설명이랑 가격? 이렇게 가지고 있을라나?
      사진은 어떻게 하지?  */}
      <UL>
        {products.map((product) => (
          <li key={product.id}>
            <button type="button">
              {product.company}
              <p>
                {product.option}
              </p>
              <p>
                {numberFormat(product.price)}
                원
              </p>
            </button>
          </li>
        ))}
      </UL>
    </div>
  );
}
