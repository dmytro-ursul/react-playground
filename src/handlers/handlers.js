import { graphql } from 'msw';

export const handlers = [
  graphql.mutation('signIn', (req, res, ctx) => {
    return res(
      ctx.data({
        signIn: {
          token: 'fake_token',
          user: {
            firstName: 'John',
            lastName: 'Doe',
          },
        },
      })
    );
  }),

  // Add more handlers for other queries and mutations as needed
];
