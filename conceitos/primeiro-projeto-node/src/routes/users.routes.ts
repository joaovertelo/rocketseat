import { Router } from 'express'
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            password
        })

        delete user.password;

        response.status(200).json(user);

    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

        const { filename } = request.file;
        const { id: userId } = request.user;

        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({ avatarFileName: filename, userId })

        delete user.password;

        return response.json({ user })

})

export default usersRouter;
