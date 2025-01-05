#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';
import debug from 'debug';
import http from 'http';
import { Socket, Server} from 'socket.io';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import { User, AuthenticatedSocket } from '../models/User';

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
/**
 * Connect to MongoDB
 */

/**
 * Create SocketIO server
 */

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true, // Allow cookies to be sent with requests
  }
});

/**
 * Check if user has been verified through Google
 */

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token){
    return new Error("Auth token required");
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload){
      return next(new Error("Invalid token payload"));
    }
    
    let user = await User.findOne({ user_id: payload.sub });

    (socket as AuthenticatedSocket).user = {
      user_id: user?.user_id
    };
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return next(new Error("Authentication failed"));
  }
});

/**
 * Listen to connection on socket server
 */

io.on('connection', (socket: Socket) => {
  console.log('User connected:', socket.id);
  
  // Store conversation_id on the socket object
  let conversation_id: string;

  // Listen for 'join_chat' event from client
  socket.on('join_chat', (user_id1: string, user_id2: string) => {
    // Determine a unique conversation_id based on user IDs
    conversation_id = user_id1 > user_id2 ? `${user_id1}${user_id2}` : `${user_id2}${user_id1}`;
    
    // Join the socket to the specified conversation room
    socket.join(conversation_id);
    console.log(`User ${socket.id} joined chat room: ${conversation_id}`);
    
    // Emit an event to confirm the user has joined the chat room
    socket.emit('joined_chat', { conversation_id });
  });

  socket.on('send_message', async (data) => {
    const { message, user_id } = data;

    try {
  // Broadcast the message to the unique chat room
      io.to(conversation_id).emit('receive_message', { message, user_id });

      // Optionally, acknowledge the sender that the message was sent
      socket.emit('message_sent', { success: true, message });
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error_message', { error: 'Failed to send message' });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port,  () => {
  console.log(`Server is listening on port ${port}`);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + (addr?.port || '');
  debug('Listening on ' + bind);
}

export { server };