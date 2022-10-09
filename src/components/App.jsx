import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useProductStore from '../hooks/useProductStore';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import OrderDetailPage from '../pages/OrderDetailPage';
import OrderListPage from '../pages/OrderListPage';
import OrderPage from '../pages/OrderPage';
import ProductPage from '../pages/ProductPage';
import ProductsPage from '../pages/ProductsPage';
import SignupCompletePage from '../pages/SignupCompletePage';
import SignupPage from '../pages/SignupPage';
import { apiService } from '../services/ApiService';
import Header from './Header';

const Main = styled.main`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    apiService.setAccessToken(accessToken);
    apiService.fetchUser(accessToken);
  }, []);

  return (
    <div>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signupcomplete" element={<SignupCompletePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/products/:productId"
            element={<ProductPage />}
          />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/orders" element={<OrderListPage />} />
          <Route
            path="/orders/:orderHistoryId"
            element={<OrderDetailPage />}
          />
        </Routes>
      </Main>
    </div>
  );
}
