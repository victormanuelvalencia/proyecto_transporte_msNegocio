import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Owner from 'App/Models/Owner';
import OwnerValidator from 'App/Validators/OwnerValidator';


export default class OwnersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOwner: Owner = await Owner.findOrFail(params.id)
            await theOwner.load('ownerVehicles')


            return theOwner;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) { //aqui es una forma de listar por paginas distintos teatros
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Owner.query().paginate(page, perPage)
            } else {
                return await Owner.query()
            }

        }

    }

    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ request }: HttpContextContract) {
        await request.validate(OwnerValidator)
        const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
        const theOwner: Owner = await Owner.create(body); //Esto le pide que espere 
        //El await es siempre para hacer consultas en bases de datos 
        //Lo que hace es esperar que el teatro responda
        // await theOwner.load('owner') !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return theOwner;
    }

    public async update({ params, request }: HttpContextContract) {
        const theOwner: Owner = await Owner.findOrFail(params.id);
        const body = request.body();
        theOwner.merge(body);
        return await theOwner.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOwner: Owner = await Owner.findOrFail(params.id);
            response.status(204);
            return await theOwner.delete();
    }
}
