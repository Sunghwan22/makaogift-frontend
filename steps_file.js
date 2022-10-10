/* eslint-disable no-undef */
// /* eslint-disable no-undef */
// // in this file you can append custom step methods to 'I' object

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  setupDatabase() {
    this.amOnPage(`${backdoorBaseUrl}/setup-database`);
  },

  setupProducts() {
    this.amOnPage(`${backdoorBaseUrl}/setup-product`);
  },
  deleteProducts() {
    this.amOnPage(`${backdoorBaseUrl}/delete-products`);
  },
  deleteOrderHistory() {
    this.amOnPage(`${backdoorBaseUrl}/delete-orderHistory`);
  },
  changeAmount({ userId, amount }) {
    this.amOnPage([
      backdoorBaseUrl,
      '/change-amount',
      `?userId=${userId}&amount=${amount}`,
    ].join(''));
  },
  login(identifier) {
    this.amOnPage('/');
    this.click('로그인');

    this.fillField('아이디', identifier);
    this.fillField('비밀번호', 'Tjdghks245@');
    this.click('로그인하기');

    this.waitForText('로그아웃');
  },
  order() {
    this.setupDatabase();

    this.amOnPage('/');

    this.click('스토어');

    this.click('갤럭시S22');

    this.see('총 상품금액:100,000원');

    this.click('button[name="present-button"]');

    this.see('받는 분 성함');
    this.see('받는 분 주소');
    this.see('받는 분께 보내는 메시지');

    this.fillField('받는 분 성함', '테스트');
    this.fillField('받는 분 주소', '울산광역시');
    this.fillField('받는 분께 보내는 메시지', '테스트');

    this.click('button[name="order-button"]');
  },
});
