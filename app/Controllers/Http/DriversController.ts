import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Driver from 'App/Models/Driver';
import UsersController from './UsersController';
import DriverValidator from 'App/Validators/DriverValidator';

export default class DriversController extends UsersController {
    // Utilizamos el contexto completo
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
        return await Driver.findOrFail(params.id);
        } else {
        const data = request.all();
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1);
                const perPage = request.input('per_page', 20);
                return await Driver.query().paginate(page, perPage);
            } else {
                return await Driver.query();
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(DriverValidator)
        const body = request.body();
        return await Driver.create(body);
    }

    public async update({ params, request }: HttpContextContract) {
        const driver = await Driver.findOrFail(params.id);
        const body = request.body();
        driver.merge(body);
        return await driver.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const driver = await Driver.findOrFail(params.id);
        response.status(204);
        return await driver.delete();
    }
}
