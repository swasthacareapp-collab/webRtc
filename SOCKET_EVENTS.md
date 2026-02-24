# Socket.IO Events Documentation

## Server URL
`http://localhost:5001` (or your configured PORT)

## Client Connection
```javascript
import io from 'socket.io-client';
const socket = io('http://localhost:5001');
```

## Available Events

### 1. Join Room
**Emit from client:**
```javascript
socket.emit('join-room', roomId);
```
**Receive on client:**
```javascript
socket.on('user-joined', (userId) => {
  console.log(`User ${userId} joined the room`);
});
```

### 2. Leave Room
**Emit from client:**
```javascript
socket.emit('leave-room', roomId);
```
**Receive on client:**
```javascript
socket.on('user-left', (userId) => {
  console.log(`User ${userId} left the room`);
});
```

### 3. WebRTC Offer
**Emit from client:**
```javascript
socket.emit('offer', { roomId, offer });
```
**Receive on client:**
```javascript
socket.on('offer', (offer) => {
  // Handle offer
});
```

### 4. WebRTC Answer
**Emit from client:**
```javascript
socket.emit('answer', { roomId, answer });
```
**Receive on client:**
```javascript
socket.on('answer', (answer) => {
  // Handle answer
});
```

### 5. ICE Candidate
**Emit from client:**
```javascript
socket.emit('ice-candidate', { roomId, candidate });
```
**Receive on client:**
```javascript
socket.on('ice-candidate', (candidate) => {
  // Handle ICE candidate
});
```

### 6. Send Chat Message
**Emit from client:**
```javascript
socket.emit('send-message', { roomId, message, sender });
```
**Receive on client:**
```javascript
socket.on('receive-message', ({ message, sender, timestamp }) => {
  // Display message
});
```

### 7. Typing Indicator
**Emit from client:**
```javascript
socket.emit('typing', { roomId, username });
```
**Receive on client:**
```javascript
socket.on('user-typing', (username) => {
  // Show typing indicator
});
```

### 8. Stop Typing
**Emit from client:**
```javascript
socket.emit('stop-typing', { roomId, username });
```
**Receive on client:**
```javascript
socket.on('user-stopped-typing', (username) => {
  // Hide typing indicator
});
```

### 9. Disconnect
**Auto-handled by Socket.IO**
```javascript
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
```

## Usage Example

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

// Join a room
const roomId = 'room123';
socket.emit('join-room', roomId);

// Listen for new users
socket.on('user-joined', (userId) => {
  console.log('New user joined:', userId);
});

// Send a message
socket.emit('send-message', {
  roomId: 'room123',
  message: 'Hello!',
  sender: 'John'
});

// Receive messages
socket.on('receive-message', ({ message, sender, timestamp }) => {
  console.log(`${sender}: ${message}`);
});

// WebRTC setup
socket.on('offer', async (offer) => {
  // Handle WebRTC offer
  const answer = await createAnswer(offer);
  socket.emit('answer', { roomId, answer });
});
```

## Notes

- All WebRTC events (offer, answer, ice-candidate) are automatically forwarded to other users in the same room
- The server uses `socket.to(roomId).emit()` to broadcast to all clients in a room except the sender
- Room IDs should be unique identifiers (e.g., UUIDs or user ID combinations)
- For video calls, use the same roomId for both users
