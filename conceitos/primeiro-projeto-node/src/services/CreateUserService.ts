import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import User from '../models/User'
import AppError from '../errors/AppError'

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {

    async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);
        let checkUserExists;

        checkUserExists = await usersRepository.findOne({
            where: { email }
        });

        if (checkUserExists) {
            throw new AppError('Email já existente', 400)
        }

        const hashedPassowrd = await hash(password, 8);
        const user = usersRepository.create({
            name,
            email,
            password: hashedPassowrd
        })

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
