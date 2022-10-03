Feature('home');

Scenario('visit home page', ({ I }) => {
  I.amOnPage('/');

  I.see('로그인');
  I.see('회원가입');
});

Scenario('visit homepage With login', ({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');

  I.click('로그인');
  I.login('tidls45');

  // I.amOnPage('/');
  // I.see(/내 잔액/);
  // I.see('로그아웃');
});
