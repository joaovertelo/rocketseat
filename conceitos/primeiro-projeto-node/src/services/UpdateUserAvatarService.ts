import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'

import uploadConfig from '../config/upload'
import User from '../models/User'
import AppError from '../errors/AppError'


interface Request {
    userId: string;
    avatarFileName: string
}

class UpdateUserAvatarService {

    public async execute({ userId, avatarFileName }: Request): Promise<User> {
        const usersRepository = getRepository(User);

       const user = await usersRepository.findOne(userId);

        if (!user) {
            throw new AppError('Apenas usuários autenticados podem mudar o avatar', 401);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            try {

                const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

                if (userAvatarFileExists) {
                    await fs.promises.unlink(userAvatarFilePath);
                }
            } catch (err) {
                console.log('avatar não existente no diretorio')
            }
        }

        user.avatar = avatarFileName;

        await usersRepository.save(user);

        return user;
    }

}

export default UpdateUserAvatarService;
