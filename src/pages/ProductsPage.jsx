import { useEffect } from 'react';
import ProductHeader from '../components/ProductHeader';
import Products from '../components/Products';
import useProductStore from '../hooks/useProductStore';

export default function ProductsPage() {
  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

  return (
    <div>
      <ProductHeader />
      <Products />
    </div>
  );
}
