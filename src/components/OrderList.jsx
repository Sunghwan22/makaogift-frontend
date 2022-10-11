import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useOrderStore from '../hooks/useOrderStore';

const Container = styled.div`
  /* width: 80vw; */
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
  margin-top: 5em;
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
  margin-bottom: 1em;
  color: #444444;

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
    margin-bottom: .6em;
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
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 5em;
`;

const To = styled.p`
  font-weight: bold;
`;

export default function OrderList() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();

  const orderStore = useOrderStore();

  const { orderHistories, pageNumbers } = orderStore;

  if (orderHistories.length === 0) {
    return <GuideMessage>주문한 내역이 없습니다</GuideMessage>;
  }

  const handleClickPageNumber = (number) => {
    orderStore.changePageNumber(accessToken, number);
    navigate(`/orders?page=${number}`);
  };

  const handleClickOrderHistory = (orderHistoryId) => {
    navigate(`/orders/${orderHistoryId}`, {
      state: {
        orderHistoryId,
      },
    });
  };

  return (
    <Container>
      <Guide>내가 주문한 내역입니다</Guide>
      <UL>
        {orderHistories.map((orderHistory) => (
          <li key={orderHistory.id}>
            <ProductButton
              type="button"
              onClick={() => handleClickOrderHistory(orderHistory.id)}
            >
              <Image
                src="https://cdn.pixabay.com/photo/2022/09/28/05/53/squirrel-7484292_960_720.jpg"
                // src={productImage(product.id)}
                alt="product123"
                width="103%"
                height="120px"
              />
              {orderHistory.company}
              <p>
                {orderHistory.productName}
                {orderHistory.option}
              </p>
              <To>
                To.
                {' '}
                {orderHistory.name}
              </To>
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
