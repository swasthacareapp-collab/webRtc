const Message = require('../models/Message');
const mongoose = require('mongoose');

describe('Message Model', () => {
  describe('Message Schema Validation', () => {
    
    const mockSenderId = new mongoose.Types.ObjectId();
    const mockReceiverId = new mongoose.Types.ObjectId();

    test('should create a message with valid data', () => {
      const messageData = {
        sender: mockSenderId,
        receiver: mockReceiverId,
        content: 'Hello, this is a test message',
        messageType: 'text'
      };
      
      const message = new Message(messageData);
      expect(message.sender).toEqual(mockSenderId);
      expect(message.receiver).toEqual(mockReceiverId);
      expect(message.content).toBe('Hello, this is a test message');
      expect(message.messageType).toBe('text');
    });

    test('should have default messageType as text', () => {
      const message = new Message({
        sender: mockSenderId,
        receiver: mockReceiverId,
        content: 'Test message'
      });
      
      expect(message.messageType).toBe('text');
    });

    test('should have default isRead as false', () => {
      const message = new Message({
        sender: mockSenderId,
        receiver: mockReceiverId,
        content: 'Test message'
      });
      
      expect(message.isRead).toBe(false);
    });

    test('should accept valid messageType values', () => {
      const types = ['text', 'image', 'file'];
      
      types.forEach(type => {
        const message = new Message({
          sender: mockSenderId,
          receiver: mockReceiverId,
          content: 'Test message',
          messageType: type
        });
        
        expect(message.messageType).toBe(type);
      });
    });

    test('should require sender field', () => {
      const message = new Message({
        receiver: mockReceiverId,
        content: 'Test message'
      });
      
      const error = message.validateSync();
      expect(error.errors.sender).toBeDefined();
    });

    test('should require receiver field', () => {
      const message = new Message({
        sender: mockSenderId,
        content: 'Test message'
      });
      
      const error = message.validateSync();
      expect(error.errors.receiver).toBeDefined();
    });

    test('should require content field', () => {
      const message = new Message({
        sender: mockSenderId,
        receiver: mockReceiverId
      });
      
      const error = message.validateSync();
      expect(error.errors.content).toBeDefined();
    });

    test('should trim content whitespace', () => {
      const message = new Message({
        sender: mockSenderId,
        receiver: mockReceiverId,
        content: '  Hello world  '
      });
      
      expect(message.content).toBe('Hello world');
    });

    test('should allow reading message', () => {
      const message = new Message({
        sender: mockSenderId,
        receiver: mockReceiverId,
        content: 'Test message',
        isRead: true,
        readAt: new Date()
      });
      
      expect(message.isRead).toBe(true);
      expect(message.readAt).toBeDefined();
    });

    test('should have timestamps when saved', () => {
      const message = new Message({
        sender: mockSenderId,
        receiver: mockReceiverId,
        content: 'Test message'
      });
      
      // Timestamps are configured in schema options
      expect(Message.schema.options.timestamps).toBe(true);
    });

    test('should have reference to User model for sender', () => {
      const schema = Message.schema;
      expect(schema.obj.sender.ref).toBe('User');
    });

    test('should have reference to User model for receiver', () => {
      const schema = Message.schema;
      expect(schema.obj.receiver.ref).toBe('User');
    });
  });
});
