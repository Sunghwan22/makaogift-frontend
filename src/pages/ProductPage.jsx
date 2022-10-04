import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Product from '../components/Product';
import useProductStore from '../hooks/useProductStore';

export default function ProductPage() {
  const productStore = useProductStore();

  const { productId } = useParams();

  //   const location = useLocation();

  //   const productId = location.state !== null
  //     ? location.state.productId
  //     : Number(location.pathname.split('/')[2]);

  useEffect(() => {
    productStore.fetchProduct(productId);
  }, []);

  return (
    <Product />
  );
}
