import request from 'supertest';
import app from '../source/index';
import getValidatedImgPath from '../source/utils/images/getValidatedImgPath';
import ProssingFilePath from '../source/utils/images/ProssingFilePath';
import path from 'node:path';

describe('GET /api/images', () => {
  it('returns 200 with valid params', async () => {
    const response = await request(app).get('/api/images?filename=fjord&width=200&height=200');
    expect(response.status).toBe(200);
  });

  it('returns 404 for non-existing filename', async () => {
    const response = await request(app).get('/api/images?filename=nonexistent&width=200&height=200');
    expect(response.status).toBe(404);
  });

  it('returns 400 for invalid width (non-number)', async () => {
    const response = await request(app).get('/api/images?filename=fjord&width=abc&height=200');
    expect(response.status).toBe(400);
  });

  it('returns 400 for invalid width (zero)', async () => {
    const response = await request(app).get('/api/images?filename=fjord&width=0&height=200');
    expect(response.status).toBe(400);
  });

  it('returns 400 for invalid height (negative)', async () => {
    const response = await request(app).get('/api/images?filename=fjord&width=200&height=-1');
    expect(response.status).toBe(400);
  });
});

describe('Test getValidatedImgPath Function', () => {

  it('returns valid path for existing file', async () => {
    const filepath = await getValidatedImgPath('fjord');
    expect(filepath).toBeTruthy();
  });

  it('returns null for non-existing file', async () => {
    const filepath = await getValidatedImgPath('nonexistent');
    expect(filepath).toBeNull();
  });

});

describe('Test ProssingFilePath Function', () => {
it('returns valid path for existing file', async () => {
    const filepath = await ProssingFilePath('fjord', 400, 356);
    expect(filepath).toBe(path.join(process.cwd(), 'images/thumbimgs', 'fjord_400_356.jpg'));
});
});

