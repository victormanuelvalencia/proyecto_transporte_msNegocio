import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OwnerVehicle from 'App/Models/OwnerVehicle';

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
        const body = request.body();
        const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.create(body);
        return theOwnerVehicle;
    }

    public async update({ params, request }: HttpContextContract) {
        const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id);
        const body = request.body();
        theOwnerVehicle.ownerId = body.ownerId;
        theOwnerVehicle.vehicleId = body.vehicleId;
        theOwnerVehicle.ownershipDate = body.ownershipDate;

        return await theOwnerVehicle.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id);
        response.status(204);
        return await theOwnerVehicle.delete();
    }
}
