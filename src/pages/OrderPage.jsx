import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import Order from '../components/OrderForm';
import useUserStore from '../hooks/useUserStore';

export default function OrderPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const userStore = useUserStore();

  useEffect(() => {
    console.log(accessToken);
    userStore.fetchUser(accessToken);
  }, []);

  return (
    <Order />
  );
}
