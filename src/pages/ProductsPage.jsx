import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import ProductHeader from '../components/ProductHeader';
import Products from '../components/Products';
import useProductStore from '../hooks/useProductStore';
import { apiService } from '../services/ApiService';

export default function ProductsPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProducts();
    apiService.fetchUser(accessToken);
  }, []);

  return (
    <div>
      <ProductHeader />
      <Products />
    </div>
  );
}
