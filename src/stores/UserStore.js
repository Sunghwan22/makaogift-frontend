import { apiService } from '../services/ApiService';

export default class UserStore {
  constructor() {
    this.name = '';
    this.amount = 0;
    this.errorMessage = '';

    this.listeners = new Set();
  }

  async fetchUser(accessToken) {
    const { name, amount } = await apiService.fetchUser(accessToken);

    this.name = name;
    this.amount = amount;

    this.publish();
  }

  // eslint-disable-next-line consistent-return
  async signUp({
    name, identifier, password, confirmPassword,
  }) {
    try {
      const { userName, amount } = await apiService.postUser({
        name, identifier, password, confirmPassword,
      });

      this.name = userName;
      this.amount = amount;

      return userName;
    } catch (e) {
      const { message } = e.response.data;
      this.errorMessage = message;
      this.publish();
    }
  }

  async login({ identifier, password }) {
    try {
      const { accessToken, name, amount }
      // eslint-disable-next-line operator-linebreak
      = await apiService.postSession({ identifier, password });

      this.name = name;
      this.amount = amount;

      return accessToken;
    } catch (e) {
      const { message } = e.response.data;
      this.errorMessage = message;
      this.publish();
      return '';
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);

    this.publish();
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);

    this.publish();
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }
}

export const userStore = new UserStore();
