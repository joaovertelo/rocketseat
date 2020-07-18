import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import CreateAppointmentService from '../services/CreateAppointmentService'
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();


appointmentsRouter.get('/', async (resquest, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointments = await appointmentsRepository.find();
    response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { providerId, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointmentService = new CreateAppointmentService();

        const appointment = await createAppointmentService.execute({
            providerId,
            date: parsedDate
         });

        return response.status(200).json(appointment)

    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
})

export default appointmentsRouter;
