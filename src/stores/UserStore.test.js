/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { waitFor } from '@testing-library/react';
import { apiService } from '../services/ApiService';

import UserStore from './UserStore';

const context = describe;

describe('userStoreWithLogin', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  describe('유저 스토어', () => {
    context('id와 password가 일치하는 로그인', () => {
      it('올바른 로그인', async () => {
        const accessToken = await userStore.login({
          identifier: 'tidls45',
          password: 'Tjdghks245@',
        });

        await waitFor(() => {
          expect(accessToken).toBe('ACCESS.TOKEN');
          expect(userStore.name).toBe('제로콜라');
          expect(userStore.amount).toBe(100_000);
        });
      });
    });

    context('id가 틀렸을 때', () => {
      it('로그인 실패', async () => {
        const accessToken = await userStore.login({
          identifier: 'tidls3144',
          password: 'Tjdghks245@',
        });

        await waitFor(() => {
          expect(accessToken).toBeFalsy();
          expect(userStore.name).toBeFalsy();
          expect(userStore.amount).toBeFalsy();
        });
      });
    });

    context('password가 틀렸을 때', () => {
      it('로그인 실패', async () => {
        const accessToken = await userStore.login({
          identifier: 'tidls45',
          password: 'Tjdghks245@@@@@@@@@@@@@',
        });

        await waitFor(() => {
          expect(accessToken).toBeFalsy();
          expect(userStore.name).toBeFalsy();
          expect(userStore.amount).toBeFalsy();
        });
      });
    });
  });

  describe('userStoreWithSignup', () => {
    let userStore;

    beforeEach(() => {
      userStore = new UserStore();
    });

    describe('회원가입', () => {
      context('올바른 회원가입', () => {
        it('회원가입 성공', async () => {
          const data = await userStore.signUp(
            {
              name: '제로콜라',
              identifier: 'tidls45',
              password: 'Tjdghks245@',
              confirmPassword: 'Tjdghks245@',
            },
          );
          waitFor(() => {
            expect(data.name).toBe('제로콜라');
            expect(data.amount).toBe(100_000);
          });
        });
      });

      context('이름이 조건에 맞지 않을 때', () => {
        it('회원가입 실패', async () => {
          const data = await userStore.signUp({
            name: '제로콜라1234',
            identifier: 'tidls45',
            password: 'Tjdghks245@',
            confirmPassword: 'Tjdghks245@',
          });

          expect(data).toBeFalsy();
        });
      });

      context('아이디가 조건에 맞지 않을 때', () => {
        it('회원가입 실패', async () => {
          const data = await userStore.signUp({
            name: '제로콜라',
            identifier: 'tidls3144@',
            password: 'Tjdghks245@',
            confirmPassword: 'Tjdghks245@',
          });

          expect(data).toBeFalsy();
        });
      });

      context('비밀번호가 조건에 맞지 않을 때', () => {
        it('회원가입 실패', async () => {
          const data = await userStore.signUp({
            name: '제로콜라',
            identifier: 'tidls45',
            password: 'Tjdghks245',
            confirmPassword: 'Tjdghks245@',
          });

          expect(data).toBeFalsy();
        });
      });

      context('확인비밀번호가 비밀번호와 같지 않을 때', () => {
        it('회원가입 실패', async () => {
          const data = await userStore.signUp({
            name: '제로콜라',
            identifier: 'tidls45',
            password: 'Tjdghks245@',
            confirmPassword: 'Tjdghk',
          });

          expect(data).toBeFalsy();
        });
      });
    });
  });
});

describe('userStoreWithSignup', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  describe('유저 정보 불러오기', () => {
    context('accessToken이 있을 때', () => {
      it('유저정보 불러오기 성공', async () => {
        const accessToken = 'ACCESS.TOKEN';

        apiService.setAccessToken(accessToken);

        await userStore.fetchUser(accessToken);

        expect(userStore.name).toBe('제로콜라');
        expect(userStore.amount).toBe(100_000);
      });
    });
  });
});
