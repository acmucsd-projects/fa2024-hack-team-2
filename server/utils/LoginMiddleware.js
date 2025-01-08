"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
exports.default = isLoggedIn;
