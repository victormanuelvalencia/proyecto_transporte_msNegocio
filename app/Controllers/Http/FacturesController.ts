import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Facture from 'App/Models/Facture'

export default class FactureController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theFacture: Facture = await Facture.findOrFail(params.id)
            //await theFacture.load("product")
            return theFacture;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Facture.query().paginate(page, perPage)
            } else {
                return await Facture.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theFacture: Facture = await Facture.create(body);
        return theFacture;
    }

    public async update({ params, request }: HttpContextContract) {
        const theFacture: Facture = await Facture.findOrFail(params.id);
        const body = request.body();
        //theFacture.name = body.name;
        //theFacture.description = body.description;
        return await theFacture.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theFacture: Facture = await Facture.findOrFail(params.id);
            response.status(204);
            return await theFacture.delete();
    }
}
