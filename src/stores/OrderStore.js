import { apiService } from '../services/ApiService';

export default class OrderStore {
  constructor() {
    this.product = {};
    this.quantity = 0;
    this.totalPrice = 0;
    this.errorMessage = '';

    this.orderHistories = [];
    this.orderHistory = {};

    this.pageNumber = 0;
    this.pageNumbers = [];

    this.listeners = new Set();
  }

  async requestPresent({
    productId,
    quantity,
    totalPrice,
    name,
    address,
    message,
  }) {
    try {
      await apiService.createOrder({
        productId,
        quantity,
        totalPrice,
        name,
        address,
        message,
      });
    } catch (e) {
      const { errorMessage } = e.response.data;
      this.errorMessage = errorMessage;
      this.publish();
    }
  }

  async fetchOrderHistories(accessToken) {
    this.orderHistories = [];
    this.publish();

    const { orderHistories, pageNumber } = await apiService.fetchOrderHistories(accessToken);

    this.orderHistories = orderHistories;

    this.pageNumbers = [...Array(pageNumber)].map((number, index) => index + 1);
    this.publish();
  }

  async changePageNumber(accessToken, number) {
    this.orderHistories = await apiService.orderHistoryChangePage(accessToken, number);
    this.publish();
  }

  async fetchOrderHistory(orderHistoryId) {
    this.orderHistory = {};
    this.publish();

    this.orderHistory = await apiService.fetchOrderHistory(orderHistoryId);
    this.publish();
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

export const orderStore = new OrderStore();
