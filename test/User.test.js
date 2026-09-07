const User = require('../models/User');

describe('User Model', () => {
  describe('User Schema Validation', () => {
    
    test('should create a user with valid data', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      
      const user = new User(userData);
      expect(user.username).toBe('testuser');
      expect(user.email).toBe('test@example.com');
      expect(user.password).toBe('password123');
    });

    test('should have default status as offline', () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
      
      expect(user.status).toBe('offline');
    });

    test('should have default avatar as empty string', () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
      
      expect(user.avatar).toBe('');
    });

    test('should accept valid status values', () => {
      const statuses = ['online', 'offline', 'away'];
      
      statuses.forEach(status => {
        const user = new User({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          status
        });
        
        expect(user.status).toBe(status);
      });
    });

    test('should require username field', () => {
      const user = new User({
        email: 'test@example.com',
        password: 'password123'
      });
      
      const error = user.validateSync();
      expect(error.errors.username).toBeDefined();
    });

    test('should require email field', () => {
      const user = new User({
        username: 'testuser',
        password: 'password123'
      });
      
      const error = user.validateSync();
      expect(error.errors.email).toBeDefined();
    });

    test('should require password field', () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com'
      });
      
      const error = user.validateSync();
      expect(error.errors.password).toBeDefined();
    });

    test('should validate email format', () => {
      const user = new User({
        username: 'testuser',
        email: 'invalid-email',
        password: 'password123'
      });
      
      const error = user.validateSync();
      expect(error.errors.email).toBeDefined();
    });

    test('should require minimum username length of 3', () => {
      const user = new User({
        username: 'ab',
        email: 'test@example.com',
        password: 'password123'
      });
      
      const error = user.validateSync();
      expect(error.errors.username).toBeDefined();
    });

    test('should require minimum password length of 6', () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: '12345'
      });
      
      const error = user.validateSync();
      expect(error.errors.password).toBeDefined();
    });

    test('should trim username and email', () => {
      const user = new User({
        username: '  testuser  ',
        email: '  test@example.com  ',
        password: 'password123'
      });
      
      expect(user.username).toBe('testuser');
      expect(user.email).toBe('test@example.com');
    });

    test('should convert email to lowercase', () => {
      const user = new User({
        username: 'testuser',
        email: 'Test@Example.COM',
        password: 'password123'
      });
      
      expect(user.email).toBe('test@example.com');
    });

    test('should have timestamps when saved', () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
      
      // Timestamps are configured in schema options
      expect(User.schema.options.timestamps).toBe(true);
    });

    test('should have lastSeen field with default date', () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
      
      expect(user.lastSeen).toBeDefined();
      expect(user.lastSeen instanceof Date).toBe(true);
    });
  });
});
