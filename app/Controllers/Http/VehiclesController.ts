import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle';
import VehicleValidator from 'App/Validators/VehicleValidator';

export default class VehiclesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theVehicle: Vehicle = await Vehicle.findOrFail(params.id)
            await theVehicle.load('operation')
            return theVehicle;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) { //aqui es una forma de listar por paginas distintos teatros
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Vehicle.query().paginate(page, perPage)
            } else {
                return await Vehicle.query()
            }

        }

    }

    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ request }: HttpContextContract) {
        await request.validate(VehicleValidator)
        const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
        const theVehicle: Vehicle = await Vehicle.create(body); //Esto le pide que espere 
        //El await es siempre para hacer consultas en bases de datos 
        //Lo que hace es esperar que el teatro responda
        // await theVehicle.load('operation') !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return theVehicle;
    }

    public async update({ params, request }: HttpContextContract) {
        const theVehicle: Vehicle = await Vehicle.findOrFail(params.id);
        const body = request.body();
        theVehicle.license_plate = body.license_plate;
        theVehicle.type_vehicle = body.type_vehicle;
        theVehicle.max_load_capacity = body.max_load_capacity;

        return await theVehicle.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theVehicle: Vehicle = await Vehicle.findOrFail(params.id);
            response.status(204);
            return await theVehicle.delete();
    }
}
