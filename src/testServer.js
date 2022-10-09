/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../config';

const baseurl = config.apiBaseUrl;

const server = setupServer(
  rest.post(`${baseurl}/session`, async (req, res, ctx) => {
    const { identifier, password } = await req.json();
    if (identifier === 'tidls45' && password === 'Tjdghks245@') {
      return res(ctx.json({
        accessToken: 'ACCESS.TOKEN',
        name: '제로콜라',
        amount: 100_000,
      }));
    }
    return res(ctx.status(400));
  }),

  rest.post(`${baseurl}/user`, async (req, res, ctx) => {
    const {
      name, identifier, password, confirmPassword,
    } = await req.json();
    if (name === '제로콜라' && identifier === 'tidls45'
     && password === 'Tjdghks245@' && confirmPassword === 'Tjdghks245@') {
      return res(ctx.json({
        userName: '제로콜라',
        amount: 100_000,
      }));
    }
    return res(ctx.status(400));
  }),

  rest.get(`${baseurl}/products`, async (req, res, ctx) => res(ctx.json({
    products: [
      {
        id: 1,
        company: '애플',
        name: 'M2맥북프로',
        option: '그라파이트',
        price: 1_500_000,
        description: '갖고 싶다',
      },
    ],
  }))),

  rest.get(`${baseurl}/products/1`, async (req, res, ctx) => res(ctx.json({
    products:
      {
        id: 1,
        company: '애플',
        name: 'M2맥북프로',
        option: '그라파이트',
        price: 1_500_000,
        description: '갖고 싶다',
      },
  }))),
);

export default server;
