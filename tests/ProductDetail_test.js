Feature('상품 상세페이지');

Scenario('상품 상세 페이지', ({ I }) => {
  I.setupProducts();

  I.amOnPage('/');
  I.click('스토어');

  I.see('애플', 'button[type="button"]');
  I.click('애플', 'button[type="button"]');

  I.see('아이폰14');
  I.see('맥스');
  I.see('총 상품금액:1,500,000원');
  I.see('상품설명');
  I.see('총 상품금액:');
});

Scenario('상세페이지에서 상품갯수를 2개로 변경', ({ I }) => {
  I.setupProducts();

  I.amOnPage('/');
  I.click('스토어');

  I.see('애플', 'button[type="button"]');
  I.click('애플', 'button[type="button"]');

  I.see('아이폰14');
  I.see('맥스');
  I.see('총 상품금액:1,500,000원');
  I.see('상품설명');
  I.see('총 상품금액:');

  I.click('button[name="addQuantity-button"]');

  I.see('총 상품금액:3,000,000원');
});

Scenario('상품갯수를 1개일때 -버튼 클릭', ({ I }) => {
  I.setupProducts();

  I.amOnPage('/');
  I.click('스토어');

  I.see('애플', 'button[type="button"]');
  I.click('애플', 'button[type="button"]');

  I.see('아이폰14');
  I.see('맥스');
  I.see('총 상품금액:1,500,000원');
  I.see('상품설명');
  I.see('총 상품금액:');

  I.click('button[name="minusQuantity-button"]');
  I.click('button[name="minusQuantity-button"]');

  I.see('총 상품금액:1,500,000원');
});
