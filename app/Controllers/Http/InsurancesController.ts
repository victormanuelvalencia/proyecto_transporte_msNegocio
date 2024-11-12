import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Insurance from 'App/Models/Insurance';
import InsuranceValidator from 'App/Validators/InsuranceValidator';

export default class InsurancesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theInsurance: Insurance = await Insurance.findOrFail(params.id);
            await theInsurance.load('vehicle');
            return theInsurance;
        } else {
            const data = request.all();
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input('per_page', 20);
                return await Insurance.query().paginate(page, perPage);
            } else {
                return await Insurance.query();
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(InsuranceValidator);
        const body = request.body();
        const theInsurance: Insurance = await Insurance.create(body);
        return theInsurance;
    }

    public async update({ params, request }: HttpContextContract) {
        const theInsurance: Insurance = await Insurance.findOrFail(params.id);
        const body = request.body();
        theInsurance.policyNumber = body.policyNumber;
        theInsurance.provider = body.provider;
        theInsurance.expirationDate = body.expirationDate;
        theInsurance.vehicleId = body.vehicleId;

        return await theInsurance.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theInsurance: Insurance = await Insurance.findOrFail(params.id);
        response.status(204);
        return await theInsurance.delete();
    }
}
