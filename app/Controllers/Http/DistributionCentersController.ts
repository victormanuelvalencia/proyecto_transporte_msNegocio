import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DistributionCenter from 'App/Models/DistributionCenter';
import DistributionCenterValidator from 'App/Validators/DistributionCenterValidator';

export default class DistributionCentersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDistributionCenter: DistributionCenter = await DistributionCenter.findOrFail(params.id)
            await theDistributionCenter.load('municipality')
            await theDistributionCenter.load('address')
            return theDistributionCenter;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) { //aqui es una forma de listar por paginas distintos teatros
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await DistributionCenter.query().paginate(page, perPage)
            } else {
                return await DistributionCenter.query()
            }
        }
    }

    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ request }: HttpContextContract) {
        await request.validate(DistributionCenterValidator)
        const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
        const theDistributionCenter: DistributionCenter = await DistributionCenter.create(body); //Esto le pide que espere 
        //El await es siempre para hacer consultas en bases de datos 
        //Lo que hace es esperar que el teatro responda
        await theDistributionCenter.load('municipality')
        return theDistributionCenter;
    }

    public async update({ params, request }: HttpContextContract) {
        const theDistributionCenter: DistributionCenter = await DistributionCenter.findOrFail(params.id);
        const body = request.body();
        theDistributionCenter.merge(body);
        return await theDistributionCenter.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDistributionCenter: DistributionCenter = await DistributionCenter.findOrFail(params.id);
            response.status(204);
            return await theDistributionCenter.delete();
    }
}