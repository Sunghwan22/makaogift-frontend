/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';
import numberFormat from '../utils/NumberFormat';
import { orderStore } from '../stores/OrderStore';

export default function Order() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();

  const userStore = useUserStore();

  const location = useLocation();

  const {
    product,
    quantity,
    totalPrice,
  } = location.state;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const {
      name, address, message,
    } = data;

    const orderInformation = {
      product, quantity, totalPrice,
    };
    await orderStore.requestPresent({
      productId: orderInformation.product.id,
      quantity,
      totalPrice,
      name,
      address,
      message,
    });

    await userStore.fetchUser(accessToken);

    if (userStore.amount >= totalPrice) {
      navigate('/orders');
    }
  };

  return (
    <div>
      <p>{product.company}</p>
      <p>
        {product.name}
        {' '}
        {' '}
        {product.option}
      </p>
      <p>
        구매수량
        {quantity}
      </p>
      <p>
        총 상품금액
        {numberFormat(totalPrice)}
        원
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="input-name">받는 분 성함</label>
          <input
            id="input-name"
            type="text"
            placeholder="이름"
            {...register(
              'name',
              {
                required: { value: true, message: '성함을 입력해주세요' },
                pattern: { value: /^[ㄱ-ㅎ|가-힣]{3,7}$/, message: '성함을 다시 확인해주세요' },
              },
            )}
          />
          {errors.name ? (
            <p>{errors.name.message}</p>
          ) : (
            <p>3~7자까지 한글만 사용 가능</p>
          )}
        </div>
        <div>
          <label htmlFor="input-address">받는 분 주소</label>
          <input
            id="input-address"
            {...register('address', { required: { value: true, message: '주소를 입력해주세요' } })}
          />
          {errors.address ? (
            <p>{errors.address.message}</p>
          ) : (
            <p>주소지를 입력해주세요</p>
          )}
        </div>
        <div>
          <label htmlFor="input-message">받는 분께 보내는 메시지</label>
          <textarea
            id="input-message"
            type="text"
            maxLength="100"
            {...register('message')}
          />
          <p>100글자이내로 입력해주세요</p>
        </div>
        <button type="submit">
          선물하기
        </button>
        {orderStore.errorMessage === '잔액이 부족하여 선물하기가 불가능합니다' ? (
          <p>{orderStore.errorMessage}</p>
        ) : null}
      </form>
    </div>
  );
}
