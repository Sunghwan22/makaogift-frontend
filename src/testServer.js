/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../config';

const baseurl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseurl}/products`, async (request, response, context) => {
    const page = await request.url.searchParams.get('page');

    if (page === '1' || !page) {
      return response(context.json({
        products:
           [
             {
               id: 1,
               company: '애플',
               name: '아이폰14',
               price: 1500000,
               description: '아이폰 14의 놀라운 혁신',
             },
             {
               id: 2,
               maker: '인사이트',
               name: 'The Pragmatic Programmer',
               price: 200,
               description: '20주년 기념판',
             },
             {
               id: 3,
               maker: '인사이트',
               name: 'Test-Driven Development',
               price: 300,
               description: 'By Example',
             },
           ],
      }));
    }
    return response(context.status(400));
  }),

  rest.get(`${baseurl}/products`, async (request, response, context) => {
    const page = await request.url.searchParams.get('page');

    if (page === '2') {
      return response(context.json({
        products:
             [
               {
                 id: 9,
                 company: '애플',
                 name: '아이폰14',
                 price: 1500000,
                 description: '아이폰 14의 놀라운 혁신',
               },
               {
                 id: 10,
                 maker: '인사이트',
                 name: 'The Pragmatic Programmer',
                 price: 200,
                 description: '20주년 기념판',
               },
               {
                 id: 11,
                 maker: '인사이트',
                 name: 'Test-Driven Development',
                 price: 300,
                 description: 'By Example',
               },
             ],
      }));
    }
    return response(context.status(400));
  }),

  rest.get(`${baseurl}/products/1`, async (request, response, context) => response(context.json({
    product: {

      id: 10,
      maker: '인사이트',
      name: 'The Pragmatic Programmer',
      price: 200,
      description: '20주년 기념판',

    },
  }))),

  // productId, quantity, totalPrice, name, address, message,
  rest.post(`${baseurl}/orders`, async (req, res, ctx) => {
    const accessToken = await req.headers.get('Authorization')
      .substring('Bearer '.length);

    const {
      productId, quantity, totalPrice, name, address, message,
    } = await req.json();

    if (accessToken
      && productId === 1 && quantity === 1 && totalPrice === 299000
    && name === '문디야' && address === '울산광역시' && message === '니도 가온나') {
      return res(ctx.json(
        { amount: 299000 },
      ));
    }
    return null;
  }),

  rest.get(`${baseurl}/orders`, async (req, res, ctx) => {
    const accessToken = await req.headers.get('Authorization');

    console.log(accessToken);

    if (accessToken === 'ACCESS.TOKEN') {
      return res(ctx.json({
        orderHistories: [
          {
            id: 1,
            identifier: 'tidls45',
            productName: '아이폰14',
            company: '애플',
            description: '갖고 싶다',
            totalPrice: 1500000,
            quantity: 1,
            name: '문진상진상',
            address: '울산광역시',
            message: '돌려줄땐 15로',
            createdAt: '2022-10-13',
          },
          {
            id: 2,
            identifier: 'tidls45',
            productName: '아이폰14',
            company: '애플',
            description: '갖고 싶다',
            totalPrice: 15000000,
            quantity: 1,
            name: '문진상진상',
            address: '울산광역시',
            message: '돌려줄땐 15로',
            createdAt: '2022-10-13',
          },
        ],
        pageNumber: 1,
      }));
    }

    return res(ctx.json({
      orderHistories: [],
      pageNumber: 0,
    }));
  }),

  rest.get(`${baseurl}/orders`, async (req, res, ctx) => {
    const accessToken = await req.headers.get('Authorization');
    const page = await req.params;

    if (accessToken === 'Bearer ACCESS.TOKEN' && page === 2) {
      return res(ctx.json({
        orderHistories: [
          {
            id: 9,
            identifier: 'tidls45',
            productName: '아이폰14',
            company: '애플',
            description: '갖고 싶다',
            totalPrice: 15000000,
            quantity: 1,
            name: '이상균',
            address: '울산광역시',
            message: '돌려줄땐 15로',
            createdAt: '2022-10-13',
          },
          {
            id: 10,
            identifier: 'tidls45',
            productName: '아이폰14',
            company: '애플',
            description: '갖고 싶다',
            totalPrice: 15000000,
            quantity: 1,
            name: '문디',
            address: '울산광역시',
            message: '돌려줄땐 15로',
            createdAt: '2022-10-13',
          },
        ],
        pageNumber: 2,
      }));
    }
    return res(ctx.status(400));
  }),

  rest.get(`${baseurl}/orders/1`, async (request, response, context) => {
    const accessToken = await request.headers.get('Authorization');

    if (accessToken === 'Bearer ACCESS.TOKEN') {
      return response(context.json({
        orderHistory: {
          id: 10,
          identifier: 'tidls45',
          productName: '트렌치코트',
          company: '드러그옴므',
          description: '갖고 싶다',
          totalPrice: 299000,
          quantity: 1,
          name: '문디',
          address: '울산광역시',
          message: '돌려줄땐 15로',
          createdAt: '2022-10-13',
        },
      }));
    }
    return response(context.status(400));
  }),

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

  rest.get(`${baseurl}/user/me`, async (request, response, context) => {
    const accessToken = await request.headers.get('Authorization');

    if (accessToken === 'Bearer ACCESS.TOKEN') {
      return response(context.json({
        name: '제로콜라',
        amount: 100_000,
      }));
    }

    if (!accessToken === 'Bearer ACCESS.TOKEN') {
      return response(
        context.status(400),
      );
    }

    return response(context.status(400));
  }),
);

export default server;
