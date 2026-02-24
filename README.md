# Chat App Backend

A Node.js backend for a chat application with MongoDB database.

## Features

- User management (CRUD operations)
- Message sending and receiving
- Real-time message status tracking
- MongoDB integration

## Project Structure

```
Backend/
├── app.js              # Main application file
├── package.json        # Dependencies and scripts
├── .env               # Environment variables
├── controllers/       # Request handlers
│   ├── userController.js
│   └── messageController.js
├── models/           # Database schemas
│   ├── User.js
│   └── Message.js
├── routers/          # API routes
│   ├── userRoutes.js
│   └── messageRoutes.js
└── utils/            # Utility functions
    ├── db.js
    └── responseHandler.js
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running locally on port 27017

3. Configure environment variables in `.env` file

4. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Messages
- `GET /api/messages?userId1=xxx&userId2=yyy` - Get messages between two users
- `POST /api/messages` - Send a new message
- `PUT /api/messages/:id/read` - Mark message as read
- `DELETE /api/messages/:id` - Delete a message
- `GET /api/messages/unread/:userId` - Get unread message count

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment mode (development/production)
