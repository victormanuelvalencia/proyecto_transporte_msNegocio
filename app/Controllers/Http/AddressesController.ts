import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address';
import AddressValidator from 'App/Validators/AddressValidator';

export default class AddressesController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theAddress: Address = await Address.findOrFail(params.id)
            await theAddress.load('municipality')
            await theAddress.load('distributionCenter')
            return theAddress;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) { //aqui es una forma de listar por paginas distintos teatros
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Address.query().paginate(page, perPage)
            } else {
                return await Address.query()
            }

        }

    }

    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ request }: HttpContextContract) {
        await request.validate(AddressValidator)
        const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
        const theAddress: Address = await Address.create(body); //Esto le pide que espere 
        //El await es siempre para hacer consultas en bases de datos 
        //Lo que hace es esperar que el teatro responda
        await theAddress.load('municipality')
        return theAddress;
    }

    public async update({ params, request }: HttpContextContract) {
        const theAddress: Address = await Address.findOrFail(params.id);
        const body = request.body();
        theAddress.street = body.street;
        theAddress.street_number = body.street_number;
        theAddress.reference_point = body.reference_point;
        theAddress.municipality_id = body.municipality_id;
        theAddress.distributionCenter = body.distributionCenter;
        return await theAddress.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theAddress: Address = await Address.findOrFail(params.id);
            response.status(204);
            return await theAddress.delete();
    }
}
