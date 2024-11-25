import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Restriction from 'App/Models/Restriction';
import RestrictionValidator from 'App/Validators/RestrictionValidator';
import axios from 'axios';
import Env from "@ioc:Adonis/Core/Env";

export default class RestrictionsController {
    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ request }: HttpContextContract) {
        await request.validate(RestrictionValidator)
        const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
        const theRestriction: Restriction = await Restriction.create(body); //Esto le pide que espere 
        await theRestriction.load("municipality", (expenseQuery) => 
            {
              expenseQuery.preload("operation", (expenseQuery) => 
                {
                  expenseQuery.preload("vehicle", (expenseQuery) => 
                    {
                      expenseQuery.preload("ownerVehicle", (expenseQuery) =>
                    {
                        expenseQuery.preload("owner")
                    })
                    })
                })
            })
            let municipality = theRestriction.municipality;
            let vehicles;
            let owner;
            for (const operation of municipality.operation){
                vehicles = operation.vehicle
                for (const ownerVehicle of vehicles.ownerVehicle) {
                    owner = ownerVehicle.owner;
                    if (owner) break;
                }
            }
            const theUserResponse = await axios.get(
              `${Env.get("MS_SECURITY")}/users/${owner.user}`,
              {
                headers: { Authorization: request.headers().authorization || "" },
              }
            );
            const emailResponse = await axios.post( 
            `${Env.get("MS_NOTIFICATIONS")}/send-welcome-email`, // Construye la URL del endpoint del ms 
            {
              //Envia el nombre y el correo del usuario obtenido desde el ms de seguridad
              name: theUserResponse.data.name,
              email: theUserResponse.data.email
            });
            if (!emailResponse.data || emailResponse.status !== 200) {
              console.warn("No se pudo enviar el email de retricciones.");}
        //El await es siempre para hacer consultas en bases de datos 
        //Lo que hace es esperar que el teatro responda
        await theRestriction.load('municipality')
        return theRestriction;
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRestriction: Restriction = await Restriction.findOrFail(params.id);
            response.status(204);
            return await theRestriction.delete();
    }
}
