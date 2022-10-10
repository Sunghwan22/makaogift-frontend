Feature('상품 목록');

Scenario('상품 목록 확인', ({ I }) => {
  I.setupProducts();

  I.amOnPage('/products');

  I.see('애플', 'button[type="button"]');
  I.see('삼성전자', 'button[type="button"]');
  I.see('LG', 'button[type="button"]');
});

Scenario('상품 목록이 없을 때', ({ I }) => {
  I.deleteProducts();

  I.amOnPage('/');

  I.click('스토어');

  I.see('상품이 존재하지 않습니다');
});

Scenario('상품이 8개 이상일 때', ({ I }) => {
  I.setupProducts();

  I.amOnPage('/');

  I.click('스토어');

  I.see('2', 'button[type="button"]');
});
