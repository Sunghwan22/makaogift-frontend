import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import OrderList from '../components/OrderList';
import useOrderStore from '../hooks/useOrderStore';

export default function OrderListPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const orderStore = useOrderStore();

  useEffect(() => {
    orderStore.fetchOrderHistories(accessToken);
  }, []);

  return (
    <OrderList />
  );
}
