import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Company from 'App/Models/Company'

export default class CompanyController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCompany: Company = await Company.findOrFail(params.id)
            await theCompany.load("naturalPerson")
            //await theCompany.load("customer")
            return theCompany;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Company.query().paginate(page, perPage)
            } else {
                return await Company.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theCompany: Company = await Company.create(body);
        return theCompany;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCompany: Company = await Company.findOrFail(params.id);
        const body = request.body();
        theCompany.name = body.name;
        theCompany.nit = body.nit;
        theCompany.contact = body.contact
        return await theCompany.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCompany: Company = await Company.findOrFail(params.id);
            response.status(204);
            return await theCompany.delete();
    }
}
