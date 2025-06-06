import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from './index';

describe('Express App', () => {
  describe('POST /login', () => {
    it('should return 400 for missing credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Username and password are required');
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'nonexistent',
          password: 'wrongpass'
        });
      
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid username or password');
    });

    it('should return 200 for valid credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'admin',
          password: 'admin123'
        });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.user.username).toBe('admin');
    });

    it('should be vulnerable to SQL injection', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: "admin' OR '1'='1",
          password: 'anypassword'
        });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.allUsers).toBeDefined();
      expect(response.body.allUsers.length).toBeGreaterThan(1);
    });
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const response = await request(app)
        .get('/users');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
