import { Request, Response } from 'express'
import createUser from './services/CreateUser'

export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        name: "joao",
        email: "kdfjdf",
        senha: 123,
        techs: ['dsfsdf', 'dsf', 123]
    });
    return response.json(user)
}