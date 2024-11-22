import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SecAddress from 'App/Models/SecAddress';

export default class SecAddressesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theSecAddress: SecAddress = await SecAddress.findOrFail(params.id)
            await theSecAddress.load('municipality')
            await theSecAddress.load('distributionCenter')
            return theSecAddress;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) { //aqui es una forma de listar por paginas distintos teatros
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await SecAddress.query().paginate(page, perPage)
            } else {
                return await SecAddress.query()
            }

        }

    }

    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ request }: HttpContextContract) {
        //await request.validate(SecAddressValidator)
        const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
        const theSecAddress: SecAddress = await SecAddress.create(body); //Esto le pide que espere 
        //El await es siempre para hacer consultas en bases de datos 
        //Lo que hace es esperar que el teatro responda

        return theSecAddress;
    }

    public async update({ params, request }: HttpContextContract) {
        const theSecAddress: SecAddress = await SecAddress.findOrFail(params.id);
        const body = request.body();
        theSecAddress.street = body.street;
        theSecAddress.street_number = body.street_number;
        theSecAddress.reference_point = body.reference_point;
        theSecAddress.municipality_id = body.municipality_id;
        theSecAddress.distribution_center_id = body.distribution_center_id;
        return await theSecAddress.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSecAddress: SecAddress = await SecAddress.findOrFail(params.id);
            response.status(204);
            return await theSecAddress.delete();
    }
}
