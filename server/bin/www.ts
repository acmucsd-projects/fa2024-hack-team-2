#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';
import debug from 'debug';
import http from 'http';
import { Socket, Server} from 'socket.io';
import mongoose from 'mongoose';
import { Message } from '../schemas/messageSchema';
import { v4 as uuidv4} from 'uuid';

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

mongoose.connect('mongodb://127.0.0.1:27017/testMessages').then(() =>{
  console.log('connected to mongodb');
}).catch((err) => {
  console.error('error connecting to mongodb', err);
});

/**
 * Create SocketIO server
 */

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

/**
 * Listen to connection on socket server
 */

io.on('connection', (socket: Socket) => {
  console.log('user connected:', socket.id);

  socket.on('join_room', (conversation_id) => {
      socket.join(conversation_id);
      console.log('user joined room:', conversation_id);
  });
  
  socket.on('send_message', async (data) =>{
    const newMessage = new Message({
        message: data.message,
        conversation_id: data.conversation_id,
        user_id: data.user_id,
        time: data.time
    });
    
    try {
      await newMessage.save();
      console.log('saved message:', newMessage.message);
      console.log('conversation id:', newMessage.conversation_id);
      socket.to(data.conversation_id).emit("receive_message", newMessage);

    } catch (error){
      console.error('error saving message', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
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