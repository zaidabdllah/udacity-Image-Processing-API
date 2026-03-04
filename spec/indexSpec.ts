import request from 'supertest';
import app from '../source/index';

describe('GET /api/images', () => {
  it('returns 200 status code', async () => {
    const response = await request(app).get('/api/images');
    expect(response.status).toBe(200);
  });
});
