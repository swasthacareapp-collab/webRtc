/**
 * Basic Test Utilities
 * Provides simple helper functions for testing
 */

/**
 * Generate a random string of specified length
 * @param {number} length - Length of the string to generate
 * @returns {string} Random string
 */
const generateRandomString = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generate a mock user object for testing
 * @param {object} overrides - Override default properties
 * @returns {object} Mock user object
 */
const generateMockUser = (overrides = {}) => {
  return {
    _id: '507f1f77bcf86cd799439011',
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    avatar: '',
    status: 'offline',
    lastSeen: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  };
};

/**
 * Generate a mock message object for testing
 * @param {object} overrides - Override default properties
 * @returns {object} Mock message object
 */
const generateMockMessage = (overrides = {}) => {
  return {
    _id: '507f1f77bcf86cd799439012',
    sender: '507f1f77bcf86cd799439011',
    receiver: '507f1f77bcf86cd799439013',
    content: 'This is a test message',
    messageType: 'text',
    isRead: false,
    readAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
const isValidEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Validate username format
 * @param {string} username - Username to validate
 * @returns {boolean} True if username is valid (at least 3 characters)
 */
const isValidUsername = (username) => {
  return typeof username === 'string' && username.length >= 3;
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {boolean} True if password is valid (at least 6 characters)
 */
const isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 6;
};

/**
 * Delay execution for specified milliseconds
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after delay
 */
const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Check if object is empty
 * @param {object} obj - Object to check
 * @returns {boolean} True if object is empty
 */
const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Deep clone an object
 * @param {object} obj - Object to clone
 * @returns {object} Cloned object
 */
const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

module.exports = {
  generateRandomString,
  generateMockUser,
  generateMockMessage,
  isValidEmail,
  isValidUsername,
  isValidPassword,
  delay,
  isEmpty,
  deepClone
};
