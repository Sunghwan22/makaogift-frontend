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
);

export default server;
