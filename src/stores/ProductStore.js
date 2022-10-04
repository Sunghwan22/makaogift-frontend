import { apiService } from '../services/ApiService';

export default class ProductStore {
  constructor() {
    this.products = [];
    this.product = {};

    this.listeners = new Set();
  }

  async fetchProduct(productId) {
    // this.product = {};
    // this.publish();

    this.product = await apiService.fetchProduct(productId);
    this.publish();
  }

  async fetchProducts() {
    this.products = [];
    this.publish();

    this.products = await apiService.fetchProducts();
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

export const productStore = new ProductStore();
