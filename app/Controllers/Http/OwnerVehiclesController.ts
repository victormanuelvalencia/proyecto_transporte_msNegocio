import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OwnerVehicle from 'App/Models/OwnerVehicle';
import OwnerVehicleValidator from 'App/Validators/OwnerVehicleValidator';

export default class OwnerVehiclesController {
    public async find({ params }: HttpContextContract) {
        if (params.id) {
            let theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id);
            await theOwnerVehicle.load('owner');
            await theOwnerVehicle.load('vehicle');
            return theOwnerVehicle;
        } else {
            return await OwnerVehicle.all();
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(OwnerVehicleValidator);
        const body = request.body();
        const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.create(body);
        return theOwnerVehicle;
    }

    public async update({ params, request }: HttpContextContract) {
        const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id);
        await request.validate(OwnerVehicleValidator);
        const body = request.body();
        theOwnerVehicle.merge(body)
        return await theOwnerVehicle.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id);
        response.status(204).json({ message: 'OwnerVehicle eliminado correctamente' });;
        return await theOwnerVehicle.delete();
    }
}