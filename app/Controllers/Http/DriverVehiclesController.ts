import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DriverVehicle from 'App/Models/DriverVehicle';
import DriverVehicleValidator from 'App/Validators/DriverVehicleValidator';

export default class DriverVehiclesController {
    public async find({ params }: HttpContextContract) {
        if (params.id) {
            let theDriverVehicle: DriverVehicle = await DriverVehicle.findOrFail(params.id);
            await theDriverVehicle.load('owner');
            await theDriverVehicle.load('vehicle');
            return theDriverVehicle;
        } else {
            return await DriverVehicle.all();
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(DriverVehicleValidator)
        const body = request.body();
        const theDriverVehicle: DriverVehicle = await DriverVehicle.create(body);
        return theDriverVehicle;
    }

    public async update({ params, request }: HttpContextContract) {
        const theOwnerVehicle: DriverVehicle = await DriverVehicle.findOrFail(params.id);
        const body = request.body();
        theOwnerVehicle.driver_id = body.driver_id;
        theOwnerVehicle.vehicle_id = body.vehicle_id;

        return await theOwnerVehicle.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDriverVehicle: DriverVehicle = await DriverVehicle.findOrFail(params.id);
        response.status(204);
        return await theDriverVehicle.delete();
    }
}