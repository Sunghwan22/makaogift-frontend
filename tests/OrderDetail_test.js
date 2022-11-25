Feature('주문내역 상세페이지');

Before(({ I }) => {
  I.setupProducts();
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

  I.amOnPage('/');

  I.click('주문조회');

  I.click('갤럭시S22');

  I.see('삼성전자');
  I.see('갤럭시S22');
  I.see('구매수량');
  I.see('1');
  I.see('총 상품금액');
  I.see('100,000원');
  I.see('받는 분');
  I.see('테스트');
  I.see('받는 분 주소');
  I.see('울산광역시');
  I.see('받는 분께 보내는 메시지');
  I.see('테스트');
});
