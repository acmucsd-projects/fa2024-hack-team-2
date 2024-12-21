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
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema_1 = require("../schemas/messageSchema");
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
mongoose_1.default.connect('mongodb://127.0.0.1:27017/testMessages').then(() => {
    console.log('connected to mongodb');
}).catch((err) => {
    console.error('error connecting to mongodb', err);
});
/**
 * Create SocketIO server
 */
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});
/**
 * Listen to connection on socket server
 */
io.on('connection', (socket) => {
    console.log('user connected:', socket.id);
    socket.on("join_chat", (conversation_id) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join(conversation_id);
    }));
    socket.on('send_message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const newMessage = new messageSchema_1.Message({
            message: data.message,
            conversation_id: data.conversation_id,
            user_id: data.user_id,
            time: data.time
        });
        try {
            yield newMessage.save();
            console.log('saved message:', newMessage.message);
            console.log('conversation id:', newMessage.conversation_id);
            socket.to(data.conversation_id).emit("receive_message", newMessage);
        }
        catch (error) {
            console.error('error saving message', error);
        }
    }));
    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
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
