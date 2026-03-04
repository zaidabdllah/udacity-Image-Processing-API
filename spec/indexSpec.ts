import request from 'supertest';
import app from '../source/index';
import getValidatedImgPath from '../source/utils/images/getValidatedImgPath';
describe('GET /api/images', () => {
  it('returns 200 with valid params', async () => {
    const response = await request(app).get(
      '/api/images?filename=fjord&width=200&height=200'
    );
    expect(response.status).toBe(200);
  });

  it('returns 404 for non-existing filename', async () => {
    const response = await request(app).get(
      '/api/images?filename=nonexistent&width=200&height=200'
    );
    expect(response.status).toBe(404);
  });

  it('returns 400 for invalid width (non-number)', async () => {
    const response = await request(app).get(
      '/api/images?filename=fjord&width=abc&height=200'
    );
    expect(response.status).toBe(400);
  });

  it('returns 400 for invalid width (zero)', async () => {
    const response = await request(app).get(
      '/api/images?filename=fjord&width=0&height=200'
    );
    expect(response.status).toBe(400);
  });

  it('returns 400 for invalid height (negative)', async () => {
    const response = await request(app).get(
      '/api/images?filename=fjord&width=200&height=-1'
    );
    expect(response.status).toBe(400);
  });
});

describe('Test getValidatedImgPath Function', () => {

  it('returns valid path for existing file', () => {
    const path = getValidatedImgPath('fjord');
    expect(path).toBeTruthy();
  });

  it('returns null for non-existing file', () => {
    const path = getValidatedImgPath('nonexistent');
    expect(path).toBeNull();
  });
  
});
