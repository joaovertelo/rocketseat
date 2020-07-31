import 'reflect-metadata'
import "./database"
import uploadconfig from './config/upload'

import express, { Request, Response, NextFunction, response } from 'express';
import 'express-async-errors'

import routes from './routes/index';
import AppError from './errors/AppError';

const app = express();

const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadconfig.directory));

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        })
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })
})

app.listen(3333, () => {
    console.log("Server started on por 3333!!!!")
})
