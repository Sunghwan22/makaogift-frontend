/* eslint-disable no-undef */
// /* eslint-disable no-undef */
// // in this file you can append custom step methods to 'I' object

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  setupDatabase() {
    this.amOnPage(`${backdoorBaseUrl}/setup-database`);
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

// const backdoorBaseUrl = 'http://localhost:8000/backdoor';

// module.exports = () => actor({
//   setupDatabase() {
//     this.amOnPage(`${backdoorBaseUrl}/setup-database`);
//   },
//   changeAmount({ userId, amount }) {
//     this.amOnPage([
//       backdoorBaseUrl,
//       '/change-amount',
//       `?userId=${userId}&amount=${amount}`,
//     ].join(''));
//   },
//   login(accountNumber) {
//     this.amOnPage('/login');

//     this.fillField('계좌 번호', accountNumber);
//     this.fillField('비밀번호', 'password');
//     this.click(['type=submit']);

//     this.waitForText('로그아웃');
//   },
//   transfer({ to, amount, name }) {
//     this.amOnPage('/transfer');

//     this.fillField('받을 분 계좌 번호', to);
//     this.fillField('보낼 금액', amount);
//     this.fillField('받는 분께 표시할 이름', name);
//     this.click('보내기');

//     this.waitForText('계좌 이체 성공');
//   },
// });
