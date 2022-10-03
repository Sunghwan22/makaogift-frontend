import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import { apiService } from '../services/ApiService';
import Header from './Header';

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const [amount] = useLocalStorage('amount', '');

  useEffect(() => {
    apiService.setAccessToken(accessToken);
    apiService.setAmount(apiService.amount);
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/signup" element={<SignUpPage />} /> */}
          {/* <Route path="/account" element={<AccountPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/transactions" element={<TransactionsPage />} /> */}
        </Routes>
      </main>
    </div>
  );
}
