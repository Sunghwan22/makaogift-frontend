Feature('home');

Scenario('visit home page', ({ I }) => {
  I.amOnPage('/');

  I.see('Hello, world');
});
