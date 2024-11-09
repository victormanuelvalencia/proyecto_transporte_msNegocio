import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipality from 'App/Models/Municipality';

export default class MunicipalitiesController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMunicipality: Municipality = await Municipality.findOrFail(params.id)
            await theMunicipality.load('department')
            return theMunicipality;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) { //aqui es una forma de listar por paginas distintos teatros
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Municipality.query().paginate(page, perPage)
            } else {
                return await Municipality.query()
            }

        }

    }

    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ request }: HttpContextContract) {
        const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
        const theMunicipality: Municipality = await Municipality.create(body); //Esto le pide que espere 
        //El await es siempre para hacer consultas en bases de datos 
        //Lo que hace es esperar que el teatro responda
        await theMunicipality.load('department')
        return theMunicipality;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMunicipality: Municipality = await Municipality.findOrFail(params.id);
        const body = request.body();
        theMunicipality.name = body.name;
        theMunicipality.zip_code = body.zip_code;
        theMunicipality.department_id = body.department_id;
        return await theMunicipality.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMunicipality: Municipality = await Municipality.findOrFail(params.id);
            response.status(204);
            return await theMunicipality.delete();
    }
}
