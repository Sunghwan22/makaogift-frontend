import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';

export default function HomePage() {
  const userStore = useUserStore();
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    userStore.fetchUser(accessToken);
  }, []);

  return (
    <div>
      <p>무엇을 선물할 지 고민이라면</p>
      <h2>특별한 아이템을 전하세요</h2>
      <p>마카오 선물하기에서만 볼 수 있는 특별한 아이템</p>
    </div>
  );
}
