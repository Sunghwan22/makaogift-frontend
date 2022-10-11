import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useProductStore from '../hooks/useProductStore';
import useUserStore from '../hooks/useUserStore';
import Image from '../assets/드러그옴므.jpeg';

import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  height: 90vh;
  min-width: 80vw;
  min-height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20%;
`;

const ProductName = styled.p`
  font-size: 1em;
  margin-bottom: 1em;
  color: #444444;
`;

const ProductPrice = styled.p`
  font-weight: bold;
  margin-bottom: 1em;
  color: #444444;
  padding-bottom: 1.5em;
  border-bottom: 1px solid #D9D9D9;
`;

const ImportantBox = styled.div`
  height: 25vh;
  display: inline;
  justify-content: space-between;
`;

const Div = styled.div`
`;

const Company = styled.div`
  min-width: 23vw;
  display: inline-block;
  justify-content: space-between;
  padding-bottom: 1em;
  border-bottom: 1px solid #D9D9D9;

  span {
    font-size: .7em;
    padding-right: 3em;
  }
`;

const Quantity = styled.div`
  padding-top: 1em;
  min-width: 23vw;
  padding-bottom: 1em;
  border-bottom: 1px solid #D9D9D9;

  span {
    font-size: .7em;
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;
    margin-left: .5em;
    margin-right: .5em;
  }
`;

const Description = styled.div`
  font-size: .7em;
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  border-bottom: 1px solid #D9D9D9;
`;

const Span = styled.span`
  padding-right: 3em;
`;

const TotalPrice = styled.div`
  padding-top: 1em;
  padding-bottom: 1em;
  text-align: right;

  p{
    font-size: .6em;
  }

  span {
    padding-left: .3em;
    font-weight: bold;
    font-size: 1.5em;
    color: #444444;
  }
`;

const Button = styled.div`
  width: 100%;

  button{
    font-size: .7em;
    color: white;
    background: #22DAAB;
    margin-top: 1em;
    padding : 1em;
    border: none;
    border-radius: .5em;
    cursor: pointer;
    width: 100%
  }
`;

const Error = styled.p`
   font-size : .5em;
   color: red;
   margin-top: .5em;
`;

const ProductImage = styled.div`
  width: 30vw;
  height: 64vh;
  background-size: cover;
  background-image: url(${Image});
  margin-right: 3em;
`;

export default function Product() {
  const userStore = useUserStore();

  const [accessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();

  const productStore = useProductStore();

  const { totalPrice, quantity, product } = productStore;

  const handleClickReduceQuantity = () => {
    productStore.reduceQuantity();
  };

  const handleClickAddQuantity = () => {
    productStore.addQuantity();
  };

  const handleClickPresent = () => {
    if (!accessToken) {
      navigate('/login', {
        state: {
          productId: product.id,
        },
      });
    }

    if (accessToken) {
      if (userStore.amount < totalPrice) {
        productStore.setErrorMessage();
        return;
      }

      navigate('/order', {
        state: {
          product,
          quantity: productStore.quantity,
          totalPrice,
        },
      });
    }
  };

  return (
    <Container>
      <ProductImage />
      <Div>
        <ProductName>
          {product.name}
          /
          {product.option}
        </ProductName>
        <ProductPrice>{`${numberFormat(product.price)}원`}</ProductPrice>
        <ImportantBox>
          <Company>
            <span>
              제조사
            </span>
            <span>
              {product.company}
            </span>
          </Company>
          <Quantity>
            <Span>구매수량</Span>
            <button
              type="button"
              name="minusQuantity-button"
              onClick={handleClickReduceQuantity}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              name="addQuantity-button"
              onClick={handleClickAddQuantity}
            >
              +
            </button>
          </Quantity>
          <Description>
            <Span>
              상품설명
            </Span>
            <Span>
              {product.description}
            </Span>
          </Description>
        </ImportantBox>
        <TotalPrice>
          <p>
            총 상품금액:
            <span>
              {numberFormat(totalPrice)}
              원
            </span>
          </p>
        </TotalPrice>
        <Button>
          <button
            type="button"
            onClick={handleClickPresent}
            name="present-button"
          >
            선물하기
          </button>
          {productStore.errorMessage ? (
            <Error>잔액이 부족하여 선물하기가 불가합니다</Error>
          ) : null}
        </Button>
      </Div>
    </Container>
  );
}
