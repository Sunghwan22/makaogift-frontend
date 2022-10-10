import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  width: 80%;
`;

const UL = styled.ul`
    display: flex;
`;

const Image = styled.img`
  background-repeat: no-repeat;
  background-size: contain;
`;

export default function Products() {
  const navigate = useNavigate();

  const productStore = useProductStore();

  const { products, pageNumbers } = productStore;

  const handleClickProduct = (productid) => {
    navigate(`/products/${productid}`, {
      state: {
        productid,
      },
    });
  };

  const handleClickPageNumber = (number) => {
    productStore.changePageNumber(number);
    navigate(`/products?page=${number}`);
  };

  if (products.length === 0) {
    return <p>상품이 존재하지 않습니다</p>;
  }

  return (
    <Container>
      <p>인기선물을 한 자리에 모았어요</p>
      <UL>
        {products.map((product) => (
          <li key={product.id}>
            <button
              type="button"
              onClick={() => handleClickProduct(product.id)}
            >
              <Image
                src="https://cdn.pixabay.com/photo/2022/09/28/05/53/squirrel-7484292_960_720.jpg"
                // src={productImage(product.id)}
                alt="product123"
                width="50px"
                height="50px"
              />
              <p>{product.name}</p>
              <p>{product.company}</p>
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
      <UL>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              type="button"
              onClick={() => handleClickPageNumber(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </UL>
    </Container>
  );
}
