import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DriverVehicle from 'App/Models/DriverVehicle';
import DriverVehicleValidator from 'App/Validators/DriverVehicleValidator';

export default class DriverVehiclesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDriverVehicle: DriverVehicle = await DriverVehicle.findOrFail(params.id);
            //await theDriverVehicle.load('owner');
            await theDriverVehicle.load('vehicle');
            await theDriverVehicle.load('driver')
            return theDriverVehicle;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) { //aqui es una forma de listar por paginas distintos teatros
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await DriverVehicle.query().paginate(page, perPage)
            } else {
                return await DriverVehicle.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(DriverVehicleValidator);
        const body = request.body();
        const theDriverVehicle: DriverVehicle = await DriverVehicle.create(body);
        return theDriverVehicle;
    }

    public async update({ params, request }: HttpContextContract) {
        const theOwnerVehicle: DriverVehicle = await DriverVehicle.findOrFail(params.id);
        await request.validate(DriverVehicleValidator);
        const body = request.body();
        theOwnerVehicle.merge(body);
        return await theOwnerVehicle.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDriverVehicle: DriverVehicle = await DriverVehicle.findOrFail(params.id);
        response.status(204).json({ message: 'DriverVehicle eliminado correctamente' });
        return await theDriverVehicle.delete();
    }
}