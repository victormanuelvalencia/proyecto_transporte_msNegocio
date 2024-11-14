import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Driver from 'App/Models/Driver';

export default class DriversController {
    // Utilizamos el contexto completo
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return await Driver.query().where('id', params.id).preload('shifts').firstOrFail();
        } else {
            const data = request.all();
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1);
                const perPage = request.input('per_page', 20);
                return await Driver.query().preload('shifts').paginate(page, perPage);
            } else {
                return await Driver.query().preload('shifts');
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        //await request.validate(DriverValidator)
        const body = request.body();
        const theDriver: Driver = await Driver.create(body);
        return theDriver;
    }

    public async update({ params, request }: HttpContextContract) {
        const theDriver = await Driver.findOrFail(params.id);
        const body = request.body();
        theDriver.merge(body);
        return await theDriver.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDriver = await Driver.findOrFail(params.id);
        response.status(204);
        return await theDriver.delete();
    }
}
