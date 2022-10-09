import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/NumberFormat';

export default function Product() {
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
    <div>
      <p>{product.name}</p>
      <p>{product.option}</p>
      <p>{`${product.price}원`}</p>
      <p>
        제조사
        {' '}
        {product.company}
      </p>
      <div>
        <span>
          구매수량
        </span>
        <button
          type="button"
          onClick={handleClickReduceQuantity}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          type="button"
          onClick={handleClickAddQuantity}
        >
          +
        </button>
      </div>
      <p>
        상품설명
        {' '}
        {product.description}
      </p>
      <p>
        총 상품금액:
        {numberFormat(totalPrice)}
        원
      </p>
      <button
        type="button"
        onClick={handleClickPresent}
      >
        선물하기

      </button>
    </div>
  );
}
