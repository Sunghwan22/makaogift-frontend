/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import styled from 'styled-components';
import useUserStore from '../hooks/useUserStore';
import numberFormat from '../utils/NumberFormat';
import { orderStore } from '../stores/OrderStore';
import Image from '../assets/드러그옴므.jpeg';

const Container = styled.div`
  width: 65%;
  height: 80vh;
  display: flex;
  margin-top: 2em;
  margin-left: 17.5%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const Header = styled.div`
  width: 45vw;
  height: 15vh;
  display: flex;
  padding-bottom: 2em;
`;

const ProductImage = styled.div`
  display: flex;
  width: 9vw;
  height: 9vw;
  background: url(${Image});
  background-repeat: no-repeat 50%;
  background-size: cover;
  border-radius: .5em;
`;

const ProductInformation = styled.div`
  font-size: .7em;

  p {
    margin-left: 1em;
    margin-bottom: .4em;
  }
`;

const P = styled.p`
  padding-bottom: 2.5em;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 45vw;
  
  label {
    font-size: .5em;
    margin-bottom: .3em;
  }
`;

const Input = styled.input`
   border: ${(props) => (props.error ? '1px solid #F00' : '1px solid#CCC')}; 
   outline: none;
   padding: 0.6em;
   margin-bottom: .4em;
`;

const Error = styled.p`
   font-size : .5em;
   color: red;
   margin-top: .3em;
   margin-bottom: .5em;
`;

const Guide = styled.p`
  font-size: .5em;
  margin-bottom: 1em;
`;

const ButtonArea = styled.div`
  padding-left: 15%;
`;

const Button = styled.button`
  width: 85%;
  font-size: .7em;
  color: white;
  background: #22DAAB;
  margin-top: 1em;
  padding : 1em;
  border: none;
  border-radius: .5em;
  cursor: pointer;
`;

export default function OrderForm() {
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
    <Container>
      <Header>
        <ProductImage />
        <ProductInformation>
          <p>{product.company}</p>
          <P>
            {product.name}
            {' '}
            {' '}
            {product.option}
          </P>
          <p>
            구매수량 :
            {' '}
            {quantity}
          </p>
          <p>
            총 상품금액 :
            {' '}
            {numberFormat(totalPrice)}
            원
          </p>
        </ProductInformation>
      </Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputArea>
          <label htmlFor="input-name">받는 분 성함</label>
          <Input
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
            error={errors.name}
          />
          {errors.name ? (
            <Error>{errors.name.message}</Error>
          ) : (
            <Guide>3~7자까지 한글만 사용 가능</Guide>
          )}
        </InputArea>
        <InputArea>
          <label htmlFor="input-address">받는 분 주소</label>
          <Input
            id="input-address"
            placeholder="주소"
            {...register('address', { required: { value: true, message: '주소를 입력해주세요' } })}
            error={errors.address}
          />
          {errors.address ? (
            <Error>{errors.address.message}</Error>
          ) : (
            <Guide>주소지를 입력해주세요</Guide>
          )}
        </InputArea>
        <InputArea>
          <label htmlFor="input-message">받는 분께 보내는 메시지</label>
          <Input
            id="input-message"
            type="text"
            maxLength="100"
            placeholder="메시지"
            {...register('message')}
          />
          <Guide>100글자이내로 입력해주세요</Guide>
        </InputArea>
        <ButtonArea>
          <Button
            type="submit"
            name="order-button"
          >
            선물하기
          </Button>
          {orderStore.errorMessage === '잔액이 부족하여 선물하기가 불가능합니다' ? (
            <p>{orderStore.errorMessage}</p>
          ) : null}
        </ButtonArea>
      </form>
    </Container>
  );
}
