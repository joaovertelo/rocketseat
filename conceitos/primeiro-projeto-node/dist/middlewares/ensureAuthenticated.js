"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../config/auth"));
function ensureAuthenticated(request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(400).json("JWT token não existente");
    }
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        var _b = decoded, sub = _b.sub, iat = _b.iat, exp = _b.exp;
        request.user = {
            id: sub
        };
        return next();
    }
    catch (err) {
        return response.status(400).json("JWT token inválido");
    }
}
exports.default = ensureAuthenticated;
