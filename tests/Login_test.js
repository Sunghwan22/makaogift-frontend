Feature('Login');

Before(({ I }) => {
  // Todo: 계좌 설정
  I.setupDatabase();
  I.changeAmount({ userId: 1, amount: 1000 });
  I.changeAmount({ userId: 2, amount: 2000 });
});

Scenario('correct Login', ({ I }) => {
  I.amOnPage('/');
  I.click('로그인');

  I.fillField('아이디', 'tidls45');
  I.fillField('비밀번호', 'Tjdghks245@');
  I.click('로그인하기');

  I.amOnPage('/');
  I.see('내 잔액: 1,000원');
});

Scenario('아이디를 입력하지 않았을 때', ({ I }) => {
  I.amOnPage('/');
  I.click('로그인');

  I.fillField('아이디', '');
  I.fillField('비밀번호', 'Tjdghks245@');
  I.click('로그인하기');

  I.see('아이디를 입력해주세요');
});

Scenario('비밀번호를 입력하지 않았을 때', ({ I }) => {
  I.amOnPage('/');
  I.click('로그인');

  I.fillField('아이디', 'tidls45');
  I.fillField('비밀번호', '');
  I.click('로그인하기');

  I.see('비밀번호를 입력해주세요');
});

Scenario('틀린 아이디 및 비밀번호를 입력했을 때', ({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
  I.click('로그인');

  I.fillField('아이디', 'tidls45');
  I.fillField('비밀번호', 'xxx');
  I.click('로그인하기');

  I.see('아이디 혹은 비밀번호가 맞지 않습니다');
});
