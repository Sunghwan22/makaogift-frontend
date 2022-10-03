import { apiService } from '../services/ApiService';

export default class UserStore {
  constructor() {
    this.name = '';
    this.amount = 0;

    this.listeners = new Set();
  }

  async login({ id, password }) {
    try {
      const { accessToken, name, amount }
      // eslint-disable-next-line operator-linebreak
      = await apiService.postSession({ id, password });

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
