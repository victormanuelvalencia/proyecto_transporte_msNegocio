import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryProduct from 'App/Models/CategoryProduct'

export default class CategoryProductController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCategoryProduct: CategoryProduct = await CategoryProduct.findOrFail(params.id)
            //await theCategoryProduct.load("product")
            return theCategoryProduct;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await CategoryProduct.query().paginate(page, perPage)
            } else {
                return await CategoryProduct.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theCategoryProduct: CategoryProduct = await CategoryProduct.create(body);
        return theCategoryProduct;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCategoryProduct: CategoryProduct = await CategoryProduct.findOrFail(params.id);
        const body = request.body();
        theCategoryProduct.category_id = body.category_id;
        theCategoryProduct.product_id = body.product_id;
        return await theCategoryProduct.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCategoryProduct: CategoryProduct = await CategoryProduct.findOrFail(params.id);
            response.status(204);
            return await theCategoryProduct.delete();
    }
}
