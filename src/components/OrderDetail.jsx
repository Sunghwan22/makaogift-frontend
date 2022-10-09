import useOrderStore from '../hooks/useOrderStore';

export default function OrderDetail() {
  const orderStore = useOrderStore();

  const { orderHistory } = orderStore;

  return (
    <div>
      <p>{orderHistory.company}</p>
      <p>
        {orderHistory.productName}
        {' '}
        {orderHistory.option}
      </p>
      <div>
        <p>
          구매수량 +
          {' '}
          {orderHistory.quantity}
        </p>
      </div>
      <div>
        <p>
          총 상품금액 +
          {' '}
          {orderHistory.totalPrice}
        </p>
      </div>
      <div>
        <p>
          구매일 +
          {' '}
          {orderHistory.createdAt}
        </p>
      </div>
      <div>
        <p>
          받는 분 +
          {' '}
          {orderHistory.name}
        </p>
      </div>
      <div>
        <p>
          받는 분 주소 +
          {' '}
          {orderHistory.address}
        </p>
      </div>
      <div>
        <p>
          받는 분께 보내는 메시지 +
          {' '}
          {orderHistory.message}
        </p>
      </div>
    </div>
  );
}
