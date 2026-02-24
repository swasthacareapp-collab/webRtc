const express = require('express');
const router = express.Router();
const {
  getMessages,
  sendMessage,
  markAsRead,
  deleteMessage,
  getUnreadCount
} = require('../controllers/messageController');

// GET messages between two users
router.get('/', getMessages);

// POST send a new message
router.post('/', sendMessage);

// PUT mark message as read
router.put('/:id/read', markAsRead);

// DELETE a message
router.delete('/:id', deleteMessage);

// GET unread message count for a user
router.get('/unread/:userId', getUnreadCount);

module.exports = router;
