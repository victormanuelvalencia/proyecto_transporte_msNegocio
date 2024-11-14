import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contract from 'App/Models/Contract'

export default class ContractController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theContract: Contract = await Contract.findOrFail(params.id)
            //await theContract.load("product")
            return theContract;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Contract.query().paginate(page, perPage)
            } else {
                return await Contract.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theContract: Contract = await Contract.create(body);
        return theContract;
    }

    public async update({ params, request }: HttpContextContract) {
        const theContract: Contract = await Contract.findOrFail(params.id);
        const body = request.body();
        //theContract.name = body.name;
        //theContract.description = body.description;
        return await theContract.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theContract: Contract = await Contract.findOrFail(params.id);
            response.status(204);
            return await theContract.delete();
    }
}
