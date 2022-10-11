import styled from 'styled-components';
import useOrderStore from '../hooks/useOrderStore';
import numberFormat from '../utils/NumberFormat';
import Image from '../assets/드러그옴므.jpeg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackGround = styled.div`
  width: 100vw;
  height: 30vh;
  background-color: #FFF5BD;

`;

const ProductImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 3em;
`;

const InformationBox = styled.div`
  padding-top: 4em;
`;

const NameBox = styled.div`
  text-align: center;

  p:first-child{
    font-size: .5em;
    color: #999999;
    padding-bottom: 1em;
  }

  p:last-child {
    font-size: .8em;
    padding-bottom: 1em;
    color: #444444;
    padding-bottom: 1.5em;
  }
`;

const ProductInformation = styled.div`
  width: 35vw;
  font-size: .5em;
  padding-top: 1.2em;
  padding-bottom: 1.2em;
  border-top: solid 1px #D9D9D9;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p:last-child {
    color: #666666;
  }
`;

const LastInformation = styled.div`
  width: 35vw;
  font-size: .5em;
  padding-top: 1.2em;
  padding-bottom: 1.2em;
  border-top: solid 1px #D9D9D9;
  border-bottom: solid 1px #D9D9D9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function OrderDetail() {
  const orderStore = useOrderStore();

  const { orderHistory } = orderStore;

  return (
    <Container>
      <BackGround>
        <ProductImage>
          <img
            alt="ProductImage"
            src={Image}
            width="25%"
            height="110%"
          />
        </ProductImage>
      </BackGround>
      <InformationBox>
        <NameBox>
          <p>{orderHistory.company}</p>
          <p>
            {orderHistory.productName}
            {' '}
            {orderHistory.option}
          </p>
        </NameBox>
        <ProductInformation>
          <p>
            구매수량
          </p>
          <p>
            {orderHistory.quantity}
          </p>
        </ProductInformation>
        <ProductInformation>
          <p>
            총 상품금액
          </p>
          <p>
            {numberFormat(orderHistory.totalPrice)}
            원
          </p>
        </ProductInformation>
        <ProductInformation>
          <p>
            구매일
          </p>
          <p>
            {orderHistory.createdAt}
          </p>
        </ProductInformation>
        <ProductInformation>
          <p>
            받는 분
          </p>
          <p>
            {orderHistory.name}
          </p>
        </ProductInformation>
        <ProductInformation>
          <p>
            받는 분 주소
          </p>
          <p>
            {orderHistory.address}
          </p>
        </ProductInformation>
        <LastInformation>
          <p>
            받는 분께 보내는 메시지
          </p>
          <p>
            {orderHistory.message}
          </p>
        </LastInformation>
      </InformationBox>
    </Container>
  );
}
