import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  /* width: 50vw; */
  height: 90vh;
  min-height: 100%;
  padding: 0 17%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Guide = styled.p`
  margin-bottom: 2em;
`;

const ProductButton = styled.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: .5em;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  border-radius: 1em;

  &:hover{
    -webkit-transform: translateY(-3px);
    -ms-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-box-shadow: 0 0 6px #999;
    box-shadow: 0 0 6px #999;
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
  }
       

  div {
    p {
    margin-bottom: .3em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    }
  }
`;

const UL = styled.ul`
  display: grid;
  grid-template-columns : 1fr 1fr 1fr 1fr;
`;

const Image = styled.img`
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: .7em;
  margin-bottom: .4em;
`;

const PageList = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 1em;
  margin-bottom: 3em;

  li{
    display: flex;
    margin-right: .4em;

    button {
      border: none;
      background: transparent;
      font-size: .5em;
      color: #9A9A9A;
      cursor: pointer;

      &:focus , &:hover{
        text-decoration: underline; text-decoration-color: #22DAAB;
        text-underline-position: under;
        text-decoration-thickness: .2em;
       }
    }
  }
`;

const GuideMessage = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 4em;
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
    return <GuideMessage>상품이 존재하지 않습니다</GuideMessage>;
  }

  return (
    <Container>
      <Guide>인기선물을 한 자리에 모았어요</Guide>
      <UL>
        {products.map((product) => (
          <li key={product.id}>
            <ProductButton
              type="button"
              onClick={() => handleClickProduct(product.id)}
            >
              <Image
                src="https://cdn.pixabay.com/photo/2022/09/28/05/53/squirrel-7484292_960_720.jpg"
                // src={productImage(product.id)}
                alt="product123"
                width="103%"
                height="120px"
              />
              <div>
                <p>{product.company}</p>
                <p>
                  {product.name}
                  {' '}
                  /
                  {product.option}
                </p>
                <p>
                  {numberFormat(product.price)}
                  원
                </p>
              </div>
            </ProductButton>
          </li>
        ))}
      </UL>
      <PageList>
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
      </PageList>
    </Container>
  );
}
