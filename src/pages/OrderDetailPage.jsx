import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import OrderDetail from '../components/OrderDetail';
import useOrderStore from '../hooks/useOrderStore';
import useUserStore from '../hooks/useUserStore';

export default function OrderDetailPage() {
  const userStore = useUserStore();

  const orderStore = useOrderStore();
  const [accessToken] = useLocalStorage('accessToken', '');

  const { orderHistoryId } = useParams();

  useEffect(() => {
    userStore.fetchUser(accessToken);
    orderStore.fetchOrderHistory(orderHistoryId);
  }, []);

  return (
    <OrderDetail />
  );
}
