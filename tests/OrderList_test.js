Feature('주문 목록 확인');

Before(({ I }) => {
  I.setupProducts();
});

Scenario('로그인을 하지 않고 주문내역확인', ({ I }) => {
  I.amOnPage('/');
  I.click('주문조회');

  I.see('USER LOGIN');
});

Scenario('거래내역이 없을 때', ({ I }) => {
  I.deleteOrderHistory();

  I.login('tidls45');

  I.amOnPage('/');

  I.click('주문조회');

  I.see('주문한 내역이 없습니다');
});

Scenario('상품 1개 선물후 거래내역 확인', ({ I }) => {
  I.login('tidls45');

  I.order();

  I.amOnPage('/');

  I.click('주문조회');

  I.see('삼성전자');
  I.see('갤럭시S22');
  I.see('To. 테스트');
});

Scenario('주문내역이 8개 이상일 때 ', ({ I }) => {
  I.deleteOrderHistory();

  I.login('tidls45');

  I.order();
  I.order();
  I.order();
  I.order();
  I.order();
  I.order();
  I.order();
  I.order();
  I.order();

  I.amOnPage('/');

  I.click('주문조회');

  I.see('삼성전자');
  I.see('갤럭시S22');
  I.see('To. 테스트');

  I.see('2', 'button[type="button"]');
});
