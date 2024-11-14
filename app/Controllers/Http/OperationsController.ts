import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operation from 'App/Models/Operation';
import OperationValidator from 'App/Validators/OperationValidator';

export default class OperationsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOperation: Operation = await Operation.findOrFail(params.id)
            await theOperation.load('vehicle')
            await theOperation.load('municipality')

            return theOperation;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) { //aqui es una forma de listar por paginas distintos teatros
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Operation.query().paginate(page, perPage)
            } else {
                return await Operation.query()
            }

        }

    }

    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ request }: HttpContextContract) {
        await request.validate(OperationValidator)
        const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
        const theOperation: Operation = await Operation.create(body); //Esto le pide que espere 
        //El await es siempre para hacer consultas en bases de datos 
        //Lo que hace es esperar que el teatro responda
        // await theOperation.load('operation') !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return theOperation;
    }

    public async update({ params, request }: HttpContextContract) {
        const theOperation: Operation = await Operation.findOrFail(params.id);
        const body = request.body();
        theOperation.merge(body);
        return await theOperation.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOperation: Operation = await Operation.findOrFail(params.id);
            response.status(204);
            return await theOperation.delete();
    }
}
