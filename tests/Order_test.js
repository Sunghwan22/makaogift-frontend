Feature('상품 주문');

Before(({ I }) => {
  I.setupProducts();
});

Scenario('로그인을 하지 않고 선물하기', ({ I }) => {
  I.amOnPage('/');
  I.click('스토어');

  I.see('애플', 'button[type="button"]');
  I.click('애플', 'button[type="button"]');

  I.click('button[name="present-button"]');

  I.see('USER LOGIN');
});

Scenario('잔액이 부족할 때 ', ({ I }) => {
  I.setupDatabase();

  I.login('tidls45');
  I.amOnPage('/');

  I.click('스토어');

  I.click('아이폰14');

  I.click('button[name="present-button"]');

  I.see('잔액이 부족하여 선물하기가 불가합니다');
});

Scenario('정상적인 주문 ', ({ I }) => {
  I.setupDatabase();

  I.login('tidls45');
  I.amOnPage('/');

  I.click('스토어');

  I.click('갤럭시S22');

  I.see('총 상품금액:100,000원');

  I.click('button[name="present-button"]');

  I.see('받는 분 성함');
  I.see('받는 분 주소');
  I.see('받는 분께 보내는 메시지');

  I.fillField('받는 분 성함', '테스트');
  I.fillField('받는 분 주소', '울산광역시');
  I.fillField('받는 분께 보내는 메시지', '테스트');

  I.click('button[name="order-button"]');

  I.see('내가 주문한 내역입니다');
  I.see('내 잔액: 900,000원');
});

Scenario('받는 분 이름을 공백으로 선물하기', ({ I }) => {
  I.setupDatabase();

  I.login('tidls45');
  I.amOnPage('/');

  I.click('스토어');

  I.click('갤럭시S22');

  I.see('총 상품금액:100,000원');

  I.click('button[name="present-button"]');

  I.fillField('받는 분 성함', '');
  I.fillField('받는 분 주소', '울산광역시');
  I.fillField('받는 분께 보내는 메시지', '테스트');

  I.click('button[name="order-button"]');

  I.see('성함을 입력해주세요');
});

Scenario('받는 분 주소를 공백으로 선물하기', ({ I }) => {
  I.setupDatabase();

  I.login('tidls45');
  I.amOnPage('/');

  I.click('스토어');

  I.click('갤럭시S22');

  I.see('총 상품금액:100,000원');

  I.click('button[name="present-button"]');

  I.fillField('받는 분 성함', '테스트');
  I.fillField('받는 분 주소', '');
  I.fillField('받는 분께 보내는 메시지', '테스트');

  I.click('button[name="order-button"]');

  I.see('주소를 입력해주세요');
});

Scenario('받는 분 이름을 형식에 맞지않는 상태에서 선물하기', ({ I }) => {
  I.setupDatabase();

  I.login('tidls45');
  I.amOnPage('/');

  I.click('스토어');

  I.click('갤럭시S22');

  I.see('총 상품금액:100,000원');

  I.click('button[name="present-button"]');

  I.fillField('받는 분 성함', 'asdasdasd');
  I.fillField('받는 분 주소', '울산광역시');
  I.fillField('받는 분께 보내는 메시지', '테스트');

  I.click('button[name="order-button"]');

  I.see('성함을 다시 확인해주세요');
});
