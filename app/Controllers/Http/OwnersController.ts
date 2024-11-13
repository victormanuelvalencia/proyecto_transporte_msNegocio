import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Owner from 'App/Models/Owner';
import OwnerValidator from 'App/Validators/OwnerValidator';
import DriversController from './DriversController';

export default class OwnersController extends DriversController {
    public async find({ request, params, response, logger, profiler, routeKey, subdomains, inspect }: HttpContextContract) {
        if (params.id) {
            const theOwner: Owner = await Owner.findOrFail(params.id);
            await theOwner.load('ownerVehicles');
            return theOwner;
        } else {
            return super.find({ request, params, response, logger, profiler, routeKey, subdomains, inspect });
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(OwnerValidator);
        const body = request.body();
        const theOwner: Owner = await Owner.create(body);
        return theOwner;
    }

    public async update({ params, request }: HttpContextContract) {
        const theOwner: Owner = await Owner.findOrFail(params.id);
        const body = request.body();
        theOwner.merge(body);
        return await theOwner.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOwner: Owner = await Owner.findOrFail(params.id);
        response.status(204);
        return await theOwner.delete();
    }
}
