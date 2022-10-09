import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useOrderStore from '../hooks/useOrderStore';

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

export default function OrderList() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();

  const orderStore = useOrderStore();

  const { orderHistories, pageNumbers } = orderStore;

  if (orderHistories.length === 0) {
    return <p>주문한 내역이 없습니다</p>;
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
      <h2>내가 주문한 내역입니다</h2>
      <UL>
        {orderHistories.map((orderHistory) => (
          <li key={orderHistory.id}>
            <button
              type="button"
              onClick={() => handleClickOrderHistory(orderHistory.id)}
            >
              <Image
                src="https://cdn.pixabay.com/photo/2022/09/28/05/53/squirrel-7484292_960_720.jpg"
                // src={productImage(product.id)}
                alt="product123"
                width="50px"
                height="50px"
              />
              {orderHistory.company}
              <p>
                {orderHistory.productName}
                {orderHistory.option}
              </p>
              <p>
                To.
                {' '}
                {orderHistory.name}
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
