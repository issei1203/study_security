import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Database } from './database';

describe('Database', () => {
  let db: Database;

  beforeEach(async () => {
    db = new Database();
  });

  afterEach(async () => {
    await db.close();
  });

  describe('authenticateUser', () => {
    it('should authenticate valid user credentials', async () => {
      const users = await db.authenticateUser('admin', 'admin123');
      expect(users).toHaveLength(1);
      expect(users[0].username).toBe('admin');
      expect(users[0].role).toBe('admin');
    });

    it('should return empty array for invalid credentials', async () => {
      const users = await db.authenticateUser('nonexistent', 'wrongpass');
      expect(users).toHaveLength(0);
    });

    it('should be vulnerable to SQL injection with OR condition', async () => {
      const users = await db.authenticateUser("admin' OR '1'='1", 'anypassword');
      expect(users.length).toBeGreaterThan(1);
    });

    it('should be vulnerable to SQL injection with UNION attack', async () => {
      const users = await db.authenticateUser("admin' UNION SELECT * FROM users --", 'anypassword');
      expect(users.length).toBeGreaterThan(0);
    });

    it('should be vulnerable to SQL injection bypassing password check', async () => {
      const users = await db.authenticateUser("admin'--", 'anypassword');
      expect(users).toHaveLength(1);
      expect(users[0].username).toBe('admin');
    });
  });

  describe('getAllUsers', () => {
    it('should return all users without passwords', async () => {
      const users = await db.getAllUsers();
      expect(users.length).toBeGreaterThan(0);
      expect(users[0]).not.toHaveProperty('password');
      expect(users[0]).toHaveProperty('username');
      expect(users[0]).toHaveProperty('email');
    });
  });
});
