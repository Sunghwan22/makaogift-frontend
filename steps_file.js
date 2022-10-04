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
});
