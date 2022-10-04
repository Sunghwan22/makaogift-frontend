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
}

export const apiService = new ApiService();
