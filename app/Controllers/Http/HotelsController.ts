import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from 'App/Models/Hotel';
import HotelValidator from 'App/Validators/HotelValidator';

export default class HotelsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theHotel: Hotel = await Hotel.findOrFail(params.id)
            await theHotel.load('expense')
            return theHotel;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) { //aqui es una forma de listar por paginas distintos teatros
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Hotel.query().paginate(page, perPage)
            } else {
                return await Hotel.query()
            }

        }

    }

    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ request }: HttpContextContract) {
        await request.validate(HotelValidator)
        const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
        const theHotel: Hotel = await Hotel.create(body); //Esto le pide que espere 
        //El await es siempre para hacer consultas en bases de datos 
        //Lo que hace es esperar que el teatro responda

        return theHotel;
    }

    public async update({ params, request }: HttpContextContract) {
        const theHotel: Hotel = await Hotel.findOrFail(params.id);
        const body = request.body();
        theHotel.service_name = body.service_name;
        theHotel.location = body.location;
        theHotel.description = body.description;
        theHotel.total_ammount = body.total_ammount;
        theHotel.total_nights = body.total_nights;
        theHotel.room_type = body.room_type;

        return await theHotel.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theHotel: Hotel = await Hotel.findOrFail(params.id);
            response.status(204);
            return await theHotel.delete();
    }
}
