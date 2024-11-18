import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Restaurant from "App/Models/Restaurant";
import RestaurantValidator from 'App/Validators/RestaurantValidator';

export default class RestaurantsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRestaurant: Restaurant = await Restaurant.findOrFail(params.id)
            await theRestaurant.load('expense')
            await theRestaurant.load('administrator')
            return theRestaurant;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) { //aqui es una forma de listar por paginas distintos teatros
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Restaurant.query().paginate(page, perPage)
            } else {
                return await Restaurant.query()
            }
        }
    }

    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ request }: HttpContextContract) {
        await request.validate(RestaurantValidator)
        const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
        const theRestaurant: Restaurant = await Restaurant.create(body); //Esto le pide que espere 
        //El await es siempre para hacer consultas en bases de datos 
        //Lo que hace es esperar que el teatro responda
        return theRestaurant;
    }

    public async update({ params, request }: HttpContextContract) {
        const theRestaurant: Restaurant = await Restaurant.findOrFail(params.id);
        const body = request.body();
        theRestaurant.merge(body);
        return await theRestaurant.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRestaurant: Restaurant = await Restaurant.findOrFail(params.id);
            response.status(204);
            return await theRestaurant.delete();
    }
}