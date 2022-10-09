import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import OrderList from '../components/OrderList';
import useOrderStore from '../hooks/useOrderStore';
import useUserStore from '../hooks/useUserStore';

export default function OrderListPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const orderStore = useOrderStore();
  const userStore = useUserStore();

  useEffect(() => {
    orderStore.fetchOrderHistories(accessToken);
    userStore.fetchUser(accessToken);
  }, []);

  return (
    <OrderList />
  );
}
