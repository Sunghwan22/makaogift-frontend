import { apiService } from '../services/ApiService';

export default class ProductStore {
  constructor() {
    this.products = [];
    this.product = {};

    this.quantity = 1;
    this.totalPrice = 0;

    this.pageNumber = 0;
    this.pageNumbers = [];

    this.errorMessage = '';

    this.listeners = new Set();
  }

  resetQntityAndTotalPrice() {
    this.quantity = 1;
    this.totalPrice = this.product.price;
    this.publish();
  }

  addQuantity() {
    this.quantity += 1;
    this.totalPrice += this.product.price;
    this.publish();
  }

  reduceQuantity() {
    if (this.quantity === 1) {
      return;
    }

    this.quantity -= 1;
    this.totalPrice -= this.product.price;
    this.publish();
  }

  async fetchProduct(productId) {
    this.product = await apiService.fetchProduct(productId);
    this.quantity = 1;
    this.totalPrice = this.product.price;
    this.publish();
  }

  async fetchProducts() {
    this.products = [];
    const { products, pageNumber } = await apiService.fetchProducts();

    this.products = products;

    this.pageNumbers = [...Array(pageNumber)].map((number, index) => index + 1);

    this.publish();
  }

  async changePageNumber(number) {
    this.products = await apiService.changePage(number);
    this.publish();
  }

  resetErrorMessage() {
    this.errorMessage = '';

    this.publish();
  }

  setErrorMessage() {
    this.errorMessage = '잔액이 부족하여 선물하기가 불가합니다';

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
