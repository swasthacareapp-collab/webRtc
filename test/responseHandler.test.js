const { sendSuccess, sendError } = require('../utils/responseHandler');

describe('Response Handler Utility', () => {
  
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  describe('sendSuccess', () => {
    
    test('should send success response with default parameters', () => {
      const data = { id: 1, name: 'Test' };
      const result = sendSuccess(res, data);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Success',
        data
      });
      expect(result).toBe(res);
    });

    test('should send success response with custom message', () => {
      const data = { id: 1, name: 'Test' };
      const message = 'User created successfully';
      
      sendSuccess(res, data, message);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message,
        data
      });
    });

    test('should send success response with custom status code', () => {
      const data = { id: 1, name: 'Test' };
      const message = 'User created successfully';
      const statusCode = 201;
      
      sendSuccess(res, data, message, statusCode);
      
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message,
        data
      });
    });

    test('should send success response with empty data', () => {
      sendSuccess(res, null);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Success',
        data: null
      });
    });

    test('should send success response with array data', () => {
      const data = [{ id: 1 }, { id: 2 }];
      
      sendSuccess(res, data, 'Users fetched successfully');
      
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Users fetched successfully',
        data
      });
    });
  });

  describe('sendError', () => {
    
    test('should send error response with default parameters', () => {
      sendError(res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error occurred',
        error: null
      });
    });

    test('should send error response with custom message', () => {
      const message = 'User not found';
      
      sendError(res, message);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message,
        error: null
      });
    });

    test('should send error response with custom status code', () => {
      const message = 'User not found';
      const statusCode = 404;
      
      sendError(res, message, statusCode);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message,
        error: null
      });
    });

    test('should send error response with error details', () => {
      const message = 'User not found';
      const statusCode = 404;
      const error = 'No user with that ID exists';
      
      sendError(res, message, statusCode, error);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message,
        error
      });
    });

    test('should send error response with 400 status for bad request', () => {
      const message = 'Invalid input';
      const statusCode = 400;
      
      sendError(res, message, statusCode);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message,
        error: null
      });
    });

    test('should send error response with 401 status for unauthorized', () => {
      const message = 'Unauthorized access';
      const statusCode = 401;
      
      sendError(res, message, statusCode);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message,
        error: null
      });
    });
  });
});
