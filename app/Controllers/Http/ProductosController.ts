import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Producto from 'App/Models/Producto'

export default class ProductosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theProducto: Producto = await Producto.findOrFail(params.id)
            //await theProducto.load("categoria")
            return theProducto;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Producto.query().paginate(page, perPage)
            } else {
                return await Producto.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theProducto: Producto = await Producto.create(body);
        return theProducto;
    }

    public async update({ params, request }: HttpContextContract) {
        const theProducto: Producto = await Producto.findOrFail(params.id);
        const body = request.body();
        theProducto.nombre = body.nombre;
        theProducto.descripcion = body.descripcion;
        theProducto.precio = body.precio;
        theProducto.peso = body.peso;
        return await theProducto.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theProducto: Producto = await Producto.findOrFail(params.id);
            response.status(204);
            return await theProducto.delete();
    }
}
