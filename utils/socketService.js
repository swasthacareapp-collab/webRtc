const { Server } = require("socket.io");

let io;

/**
 * Initialize Socket.IO server
 */
const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join room (call room)
    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
      
      // Notify others in the room
      socket.to(roomId).emit("user-joined", socket.id);
    });

    // Leave room
    socket.on("leave-room", (roomId) => {
      socket.leave(roomId);
      console.log(`User ${socket.id} left room ${roomId}`);
      
      // Notify others in the room
      socket.to(roomId).emit("user-left", socket.id);
    });

    // WebRTC Offer
    socket.on("offer", ({ roomId, offer }) => {
      console.log(`Offer sent to room ${roomId}`);
      socket.to(roomId).emit("offer", offer);
    });

    // WebRTC Answer
    socket.on("answer", ({ roomId, answer }) => {
      console.log(`Answer sent to room ${roomId}`);
      socket.to(roomId).emit("answer", answer);
    });

    // ICE Candidates
    socket.on("ice-candidate", ({ roomId, candidate }) => {
      console.log(`ICE candidate sent to room ${roomId}`);
      socket.to(roomId).emit("ice-candidate", candidate);
    });

    // Chat message
    socket.on("send-message", ({ roomId, message, sender }) => {
      console.log(`Message sent to room ${roomId} from ${sender}`);
      const timestamp = new Date();
      // Broadcast to ALL users in the room including sender
      io.to(roomId).emit("receive-message", { message, sender, timestamp });
    });

    // User typing indicator
    socket.on("typing", ({ roomId, username }) => {
      socket.to(roomId).emit("user-typing", username);
    });

    // User stopped typing
    socket.on("stop-typing", ({ roomId, username }) => {
      socket.to(roomId).emit("user-stopped-typing", username);
    });

    // Voice call signaling events
    socket.on("voice-call-offer", ({ roomId, caller, offer }) => {
      console.log(`Voice call offer from ${caller} in room ${roomId}`);
      socket.to(roomId).emit("voice-call-offer", { roomId, caller, offer });
    });

    socket.on("voice-call-answer", ({ roomId, answer, username }) => {
      console.log(`Voice call answer from ${username} in room ${roomId}`);
      socket.to(roomId).emit("voice-call-answer", { roomId, answer });
    });

    socket.on("voice-call-ice-candidate", ({ roomId, candidate, username }) => {
      console.log(`ICE candidate from ${username} in room ${roomId}`);
      socket.to(roomId).emit("voice-call-ice-candidate", { roomId, candidate });
    });

    socket.on("voice-call-end", ({ roomId, username }) => {
      console.log(`Voice call ended by ${username} in room ${roomId}`);
      socket.to(roomId).emit("voice-call-end", { roomId });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  console.log("Socket.IO initialized successfully");
  return io;
};

/**
 * Get the Socket.IO instance
 */
const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized. Call initializeSocket first.");
  }
  return io;
};

module.exports = {
  initializeSocket,
  getIO
};
