import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rute from 'App/Models/Rute';
import RuteValidator from 'App/Validators/RuteValidator';

export default class RutesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRute: Rute = await Rute.findOrFail(params.id)
            await theRute.load('dirListOrder')
            await theRute.load('lot')
            await theRute.load('contract')
            await theRute.load('vehicle')
            return theRute;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) { //aqui es una forma de listar por paginas distintos teatros
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Rute.query().paginate(page, perPage)
            } else {
                return await Rute.query()
            }

        }

    }

    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ request }: HttpContextContract) {
        await request.validate(RuteValidator)
        const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
        const theRute: Rute = await Rute.create(body); //Esto le pide que espere 
        //El await es siempre para hacer consultas en bases de datos 
        //Lo que hace es esperar que el teatro responda
        // await theRute.load('operation') !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return theRute;
    }

    public async update({ params, request }: HttpContextContract) {
        const theRute: Rute = await Rute.findOrFail(params.id);
        const body = request.body();
        theRute.distance = body.distance;
        theRute.count_distribution_centers = body.count_distribution_centers;
        theRute.average_time = body.average_time;
        theRute.contract_id = body.contract_id;
        theRute.vehicle_id = body.vehicle_id;


        return await theRute.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRute: Rute = await Rute.findOrFail(params.id);
            response.status(204);
            return await theRute.delete();
    }
}
