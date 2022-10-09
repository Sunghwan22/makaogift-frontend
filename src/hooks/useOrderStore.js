import { useEffect } from 'react';
import { orderStore } from '../stores/OrderStore';

import useForceUpdate from './useForceUpdate';

export default function useOrderStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    orderStore.subscribe(forceUpdate);

    return () => orderStore.unsubscribe(forceUpdate);
  }, []);

  return orderStore;
}
