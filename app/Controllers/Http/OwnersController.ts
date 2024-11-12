import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Owner from 'App/Models/Owner';
import OwnerValidator from 'App/Validators/OwnerValidator';

export default class OwnersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOwner: Owner = await Owner.findOrFail(params.id);
            await theOwner.load('ownerVehicles');
            return theOwner;
        } else {
            const data = request.all();
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input('per_page', 20);
                return await Owner.query().paginate(page, perPage);
            } else {
                return await Owner.query();
            }
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
        theOwner.name = body.name;
        theOwner.phoneNumber = body.phoneNumber;
        theOwner.address = body.address;

        return await theOwner.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOwner: Owner = await Owner.findOrFail(params.id);
        response.status(204);
        return await theOwner.delete();
    }
}

