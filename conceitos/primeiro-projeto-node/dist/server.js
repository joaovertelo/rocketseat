"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./database");
var upload_1 = __importDefault(require("./config/upload"));
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var index_1 = __importDefault(require("./routes/index"));
var AppError_1 = __importDefault(require("./errors/AppError"));
var app = express_1.default();
var cors = require('cors');
app.use(cors());
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.directory));
app.use(index_1.default);
app.use(function (err, request, response, next) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
});
app.listen(3333, function () {
    console.log("Server started on por 3333!!!!");
});
