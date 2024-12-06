import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoryController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCategory: Category = await Category.findOrFail(params.id)
            await theCategory.load("category")
            await theCategory.load("categoryProduct")
            return theCategory;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Category.query().paginate(page, perPage)
            } else {
                return await Category.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theCategory: Category = await Category.create(body);
        return theCategory;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCategory: Category = await Category.findOrFail(params.id);
        const body = request.body();
        theCategory.merge(body);
        return await theCategory.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCategory: Category = await Category.findOrFail(params.id);
            response.status(204);
            return await theCategory.delete();
    }
}