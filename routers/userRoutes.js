const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');


//test

// GET all users --wefewuf eiugfew
router.get('/', getAllUsers);

// GET user by ID --wefewuf eiugfew
router.get('/:id', getUserById);

// POST create new user --wefewuf eiugfew
router.post('/', createUser);

// PUT update user
router.put('/:id', updateUser);

// DELETE user
router.delete('/:id', deleteUser);

module.exports = router;
