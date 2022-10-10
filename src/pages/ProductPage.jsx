import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import Product from '../components/Product';
import useProductStore from '../hooks/useProductStore';
import useUserStore from '../hooks/useUserStore';

export default function ProductPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const productStore = useProductStore();
  const userStore = useUserStore();

  const { productId } = useParams();
  // fetchUser도 같이 해줘야 한다
  useEffect(() => {
    productStore.fetchProduct(productId);
    productStore.resetQntityAndTotalPrice();
    productStore.resetErrorMessage();
    userStore.fetchUser(accessToken);
  }, []);

  return (
    <Product />
  );
}
