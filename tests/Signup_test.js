Feature('Signup');

Before(({ I }) => {
  I.setupDatabase();
  I.amOnPage('/');
  I.click('회원가입');
});

Scenario('올바른 회원가입', ({ I }) => {
  I.fillField('이름', '조성환');
  I.fillField('아이디', 'tidls3987');
  I.fillField('비밀번호', 'Tjdghks245@');
  I.fillField('비밀번호 확인', 'Tjdghks245@');

  I.click('button[name="submit-button"]');

  I.see('회원가입 완료');
});

Scenario('이름을 공백으로 진행한 회원가입', ({ I }) => {
  I.fillField('이름', '');
  I.fillField('아이디', 'tidls7938');
  I.fillField('비밀번호', 'Tjdghks245@');
  I.fillField('비밀번호 확인', 'Tjdghks245@');

  I.click('button[name="submit-button"]');

  I.see('이름을 입력해주세요');
});

Scenario('아이디을 공백으로 진행한 회원가입', ({ I }) => {
  I.fillField('이름', '조성환');
  I.fillField('아이디', '');
  I.fillField('비밀번호', 'Tjdghks245@');
  I.fillField('비밀번호 확인', 'Tjdghks245@');

  I.click('button[name="submit-button"]');

  I.see('아이디를 입력해주세요');
});

Scenario('비밀번호를 공백으로 진행한 회원가입', ({ I }) => {
  I.fillField('이름', '조성환');
  I.fillField('아이디', 'tidls7938');
  I.fillField('비밀번호', '');
  I.fillField('비밀번호 확인', 'Tjdghks245@');

  I.click('button[name="submit-button"]');

  // I.see('비밀번호를 입력해주세요');
});

Scenario('확인 비밀번호를 공백으로 진행한 회원가입', ({ I }) => {
  I.fillField('이름', '조성환');
  I.fillField('아이디', 'tidls7938');
  I.fillField('비밀번호', 'Tjdghks245@');
  I.fillField('비밀번호 확인', '');

  I.click('button[name="submit-button"]');

  I.see('비밀번호를 입력해주세요');
});

Scenario('이름을 양식에 맞게 입력하지 않은 경우', ({ I }) => {
  I.fillField('이름', 'zerocoke');
  I.fillField('아이디', 'tidls7938');
  I.fillField('비밀번호', 'Tjdghks245@');
  I.fillField('비밀번호 확인', 'Tjdghks245@');

  I.click('button[name="submit-button"]');

  I.see('이름을 다시 확인해주세요');
});

Scenario('아이디를 양식에 맞게 입력하지 않은 경우', ({ I }) => {
  I.fillField('이름', '조성환');
  I.fillField('아이디', 'TTTTTTT');
  I.fillField('비밀번호', 'Tjdghks245@');
  I.fillField('비밀번호 확인', 'Tjdghks245@');

  I.click('button[name="submit-button"]');

  I.see('아이디를 다시 확인해주세요');
});

Scenario('비밀번호를 양식에 맞게 입력하지 않은 경우', ({ I }) => {
  I.fillField('이름', '조성환');
  I.fillField('아이디', 'tidls7938');
  I.fillField('비밀번호', 'Tjdghks245');
  I.fillField('비밀번호 확인', 'Tjdghks245@');

  I.click('button[name="submit-button"]');

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('확인 비밀번호와 비밀번호가 다를 경우', ({ I }) => {
  I.fillField('이름', '조성환');
  I.fillField('아이디', 'tidls7938');
  I.fillField('비밀번호', 'Tjdghks245@');
  I.fillField('비밀번호 확인', 'Tjdghks245');

  I.click('button[name="submit-button"]');

  I.see('비밀번호가 일치하지 않습니다');
});

Scenario('이미 있는 아이디로 회원가입을 진행할 경우', ({ I }) => {
  I.fillField('이름', '조성환');
  I.fillField('아이디', 'tidls45');
  I.fillField('비밀번호', 'Tjdghks245@');
  I.fillField('비밀번호 확인', 'Tjdghks245@');

  I.click('button[name="submit-button"]');

  I.see('해당 아이디는 사용할 수 없습니다');
});
