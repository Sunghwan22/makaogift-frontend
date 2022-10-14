/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchUser(accessToken) {
    const url = `${baseurl}/user/me`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { name, amount } = data;

    return { name, amount };
  }

  async postSession({ identifier, password }) {
    const url = `${baseurl}/session`;
    const { data } = await axios.post(url, { identifier, password });

    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amount,
    };
  }

  async postUser({
    name, identifier, password, confirmPassword,
  }) {
    const url = `${baseurl}/user`;
    const { data } = await axios.post(url, {
      name, identifier, password, confirmPassword,
    });

    const { userName, amount } = data;
    return { userName, amount };
  }

  async fetchProducts() {
    const url = `${baseurl}/products`;
    const { data } = await axios.get(url);
    const { products, pageNumber } = data;

    return { products, pageNumber };
  }

  async changePage(number) {
    const url = `${baseurl}/products`;
    // const params = { page: number };
    const { data } = await axios.get(url, {
      params: {
        page: number,
      },
    });

    return data.products;
  }

  async fetchProduct(productId) {
    const url = `${baseurl}/products/${productId}`;
    const { data } = await axios.get(url);

    const product = data;

    return product;
  }

  async createOrder({
    productId,
    quantity,
    totalPrice,
    name,
    address,
    message,
  }) {
    const url = `${baseurl}/orders`;
    const { data } = await axios.post(url, {
      productId, quantity, totalPrice, name, address, message,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    const { amount } = data;
    return { amount };
  }

  async fetchOrderHistories(accessToken) {
    const url = `${baseurl}/orders`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { orderHistories, pageNumber } = data;
    return { orderHistories, pageNumber };
  }

  async orderHistoryChangePage(accessToken, number) {
    const orderHistoryPageConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page: number,
      },
    };

    const url = `${baseurl}/orders`;

    const { data } = await axios.get(url, orderHistoryPageConfig);

    return data.orderHistories;
  }

  async fetchOrderHistory(orderHistoryId) {
    const url = `${baseurl}/orders/${orderHistoryId}`;
    const { data } = await axios.get(url);

    return data;
  }
}

export const apiService = new ApiService();
