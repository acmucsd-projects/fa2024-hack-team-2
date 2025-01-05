#!/usr/bin/env node
"use strict";
/**
 * Module dependencies.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const app_1 = __importDefault(require("../app"));
const debug_1 = __importDefault(require("debug"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const google_auth_library_1 = require("google-auth-library");
const User_1 = require("../models/User");
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3001');
app_1.default.set('port', port);
/**
 * Create HTTP server.
 */
const server = http_1.default.createServer(app_1.default);
exports.server = server;
/**
 * Connect to MongoDB
 */
/**
 * Create SocketIO server
 */
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true, // Allow cookies to be sent with requests
    }
});
/**
 * Check if user has been verified through Google
 */
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new google_auth_library_1.OAuth2Client(CLIENT_ID);
io.use((socket, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = socket.handshake.auth.token;
    if (!token) {
        return new Error("Auth token required");
    }
    try {
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return next(new Error("Invalid token payload"));
        }
        let user = yield User_1.User.findOne({ user_id: payload.sub });
        socket.user = {
            user_id: user === null || user === void 0 ? void 0 : user.user_id
        };
        console.log('Authenticated user:', socket.user);
        next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        return next(new Error("Authentication failed"));
    }
}));
/**
 * Listen to connection on socket server
 */
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    // Store conversation_id on the socket object
    let conversation_id;
    // Listen for 'join_chat' event from client
    socket.on('join_chat', (user_id1, user_id2) => {
        // Determine a unique conversation_id based on user IDs
        conversation_id = user_id1 > user_id2 ? `${user_id1}${user_id2}` : `${user_id2}${user_id1}`;
        // Join the socket to the specified conversation room
        socket.join(conversation_id);
        console.log(`User ${socket.id} joined chat room: ${conversation_id}`);
        // Emit an event to confirm the user has joined the chat room
        socket.emit('joined_chat', { conversation_id });
    });
    socket.on('send_message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { message, user_id } = data;
        try {
            // Broadcast the message to the unique chat room
            io.to(conversation_id).emit('receive_message', { message, user_id });
            // Optionally, acknowledge the sender that the message was sent
            socket.emit('message_sent', { success: true, message });
        }
        catch (error) {
            console.error('Error sending message:', error);
            socket.emit('error_message', { error: 'Failed to send message' });
        }
    }));
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
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
function onError(error) {
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
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + ((addr === null || addr === void 0 ? void 0 : addr.port) || '');
    (0, debug_1.default)('Listening on ' + bind);
}
