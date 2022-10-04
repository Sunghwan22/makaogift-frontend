/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';
    this.amount = 0;
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  setAmount(amount) {
    this.amount = amount;
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

    const { products } = data;
    return products;
  }

  async fetchProduct(productId) {
    const url = `${baseurl}/products/${productId}`;
    const { data } = await axios.get(url);

    const product = data;
    console.log(product);
    return product;
  }
}

export const apiService = new ApiService();
