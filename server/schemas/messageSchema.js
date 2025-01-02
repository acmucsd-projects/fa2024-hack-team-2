"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    message: String,
    conversation_id: String,
    user_id: String,
    time: { type: Date, default: Date.now },
});
const Message = mongoose_1.default.model('Message', messageSchema);
exports.Message = Message;