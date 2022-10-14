import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import useProductStore from '../hooks/useProductStore';

export default function ProductPage() {
  const productStore = useProductStore();

  const { productId } = useParams();
  // fetchUser도 같이 해줘야 한다
  useEffect(() => {
    productStore.fetchProduct(productId);
    productStore.resetQntityAndTotalPrice();
    productStore.resetErrorMessage();
  }, []);

  return (
    <Product />
  );
}
