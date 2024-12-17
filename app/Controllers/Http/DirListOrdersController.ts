import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DirListOrder from 'App/Models/DirListOrder';
import DirListOrderValidator from 'App/Validators/DirListOrderValidator';

export default class DirListOrdersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDirListOrder: DirListOrder = await DirListOrder.findOrFail(params.id)
            await theDirListOrder.load('rute')
            await theDirListOrder.load('address')
            return theDirListOrder;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) { //aqui es una forma de listar por paginas distintos teatros
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await DirListOrder.query().paginate(page, perPage)
            } else {
                return await DirListOrder.query()
            }
        }
    }

    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ request }: HttpContextContract) {
        await request.validate(DirListOrderValidator)
        const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
        const theDirListOrder: DirListOrder = await DirListOrder.create(body); //Esto le pide que espere 
        //El await es siempre para hacer consultas en bases de datos 
        //Lo que hace es esperar que el teatro responda
        // await theDirListOrder.load('dirlistorder') !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return theDirListOrder;
    }

    public async update({ params, request }: HttpContextContract) {
        const theDirListOrder: DirListOrder = await DirListOrder.findOrFail(params.id);
        const body = request.body();
        theDirListOrder.merge(body);
        return await theDirListOrder.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDirListOrder: DirListOrder = await DirListOrder.findOrFail(params.id);
            response.status(204);
            return await theDirListOrder.delete();
    }
}