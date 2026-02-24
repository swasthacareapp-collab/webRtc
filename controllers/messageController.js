const Message = require('../models/Message');
const { sendSuccess, sendError } = require('../utils/responseHandler');

/**
 * Get all messages between two users
 */
const getMessages = async (req, res) => {
  try {
    const { userId1, userId2 } = req.query;
    
    if (!userId1 || !userId2) {
      return sendError(res, 'Both user IDs are required', 400);
    }
    
    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 }
      ]
    })
    .populate('sender', 'username avatar')
    .populate('receiver', 'username avatar')
    .sort({ createdAt: 1 });
    
    sendSuccess(res, messages, 'Messages fetched successfully');
  } catch (error) {
    sendError(res, 'Error fetching messages', 500, error.message);
  }
};

/**
 * Send a new message
 */
const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content, messageType } = req.body;
    
    if (!sender || !receiver || !content) {
      return sendError(res, 'Sender, receiver, and content are required', 400);
    }
    
    const message = await Message.create({
      sender,
      receiver,
      content,
      messageType: messageType || 'text'
    });
    
    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'username avatar')
      .populate('receiver', 'username avatar');
    
    sendSuccess(res, populatedMessage, 'Message sent successfully', 201);
  } catch (error) {
    sendError(res, 'Error sending message', 500, error.message);
  }
};

/**
 * Mark message as read
 */
const markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true, readAt: Date.now() },
      { new: true }
    )
    .populate('sender', 'username avatar')
    .populate('receiver', 'username avatar');
    
    if (!message) {
      return sendError(res, 'Message not found', 404);
    }
    
    sendSuccess(res, message, 'Message marked as read');
  } catch (error) {
    sendError(res, 'Error updating message', 500, error.message);
  }
};

/**
 * Delete a message
 */
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return sendError(res, 'Message not found', 404);
    }
    
    sendSuccess(res, null, 'Message deleted successfully');
  } catch (error) {
    sendError(res, 'Error deleting message', 500, error.message);
  }
};

/**
 * Get unread message count for a user
 */
const getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const count = await Message.countDocuments({
      receiver: userId,
      isRead: false
    });
    
    sendSuccess(res, { count }, 'Unread count fetched successfully');
  } catch (error) {
    sendError(res, 'Error fetching unread count', 500, error.message);
  }
};

module.exports = {
  getMessages,
  sendMessage,
  markAsRead,
  deleteMessage,
  getUnreadCount
};
