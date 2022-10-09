Feature('상품 목록');

Scenario('상품 목록 확인', ({ I }) => {
  I.setupProducts();

  I.amOnPage('/');

  I.click('스토어');

  I.see('애플');
  I.see('맥스');
  I.see(/1,500,000원/);
});

Scenario('상품 목록이 없을 때', ({ I }) => {
  I.amOnPage('/');

  I.click('스토어');

  I.see('상품 목록이 없습니다');
});
// todo: 페이지 네이션 해야함
// Scenario('상품이 8개 이상일 때', ({ I }) => {
//   I.setupProducts();

//   I.amOnPage('/');

//   I.click('스토어');

//   I.see('애플');
//   I.see('맥스');
//   I.see('1,500,000');

//   I.see(2);
// });
