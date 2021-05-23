import request from 'supertest';
import App from '@/app';
import IndexRoute from '@routes/index.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      const indexRoute = new IndexRoute();
      const app = new App([indexRoute]);

      return request(app.getServer()).get(`${indexRoute.path}`).set('Authorization', 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIxODA0MjY0LCJleHAiOjE2MjE4MDc4NjR9.n9RyX8-UMvTEb_lA01DdgMcFbNeeYU1Q7L7_-oUMYfI").expect(200);
    });
  });
});
