import { Exception } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Owner from 'App/Models/Owner';
import OwnerValidator from 'App/Validators/OwnerValidator';
import axios from 'axios';
import Env from "@ioc:Adonis/Core/Env";

export default class OwnersController {
    public async find({ request, params }: HttpContextContract) {
        try {    
            if (params.id) {
                //Creamos una instancia de driver
                let theOwner: Owner = await Owner.findOrFail(params.id);
                // llamamos al microservicio de seguridad en users
                const theUserResponse = await axios.get(`${Env.get("MS_SECURITY")}/users/${theOwner.user_id}`,
                {
                    headers: { Authorization: request.headers().authorization || "" },
                }
                );

                if (!theUserResponse.data || Object.keys(theUserResponse.data).length === 0) {
                    throw new Exception(
                        "User not found",
                        404
                    );
                }
                await theOwner.load('expense')
                await theOwner.load('shift');
                await theOwner.load('ownerVehicle');
                await theOwner.load('driverVehicle');
                return { driver: theOwner, user: theUserResponse.data };
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
        } catch (error) {
            throw new Exception(
              error.message || "Error al procesar la solicitud",
              error.status || 500
            );
        }
    }

    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ response, request }: HttpContextContract) {
        try {
            const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
            const theUserResponse = await axios.get( // Realiza una solicitud get al microservicio de seguridad para verificar si existe el usuario asociado al user_id
                `${Env.get("MS_SECURITY")}/users/${body.user_id}`, // Construye la URL usando la variable de entorno MS_SECURITY y el user_id del cuerpo de la solicitud
                {
                  // Incluye el token de autorización, si está disponible, en los encabezados de la solicitud
                  headers: { Authorization: request.headers().authorization || "" }, 
                }
            );

            // Verifica si no se encontró información del usuario en la respuesta del microservicio
            // Devuelve una respuesta 404 si el usuario no fue encontrado
            if (!theUserResponse.data || Object.keys(theUserResponse.data).length === 0) { 
                return response.notFound({ 
                    error: "User not found, verify user_id", 
                });
            }
        
            await request.validate(OwnerValidator); 
            const theOwner = await Owner.create(body); 

            // Enviar correo de bienvenida
            // Realiza una solicitud POST (Ya que vamos a enviar un cuerpo) al ms de notificaciones
            const welcomeEmailResponse = await axios.post( 
                `${Env.get("MS_NOTIFICATIONS")}/send-welcome-email`, // Construye la URL del endpoint del ms 
                {
                    //Envia el nombre y el correo del usuario obtenido desde el ms de seguridad
                    name: theUserResponse.data.name, 
                    email: theUserResponse.data.email, 
                }
            );
            // Verifica si la respuesta del ms de notificaciones no es exitosa y imprime el error
            if (welcomeEmailResponse.status !== 200) { 
                console.error("Error enviando el correo de bienvenida:", welcomeEmailResponse.data); 
            }
            return theOwner;  
      
        } catch (error) {
            if (error.messages) { // Si el error tiene mensajes de validación, devuelve esos mensajes al cliente.
                return response.badRequest({ errors: error.messages.errors }); // Devuelve una respuesta 400 (Solicitud inválida) con los errores de validación.
            }
            throw new Exception( // Si ocurre cualquier otro error, lanza una excepción genérica.
                error.message || "Error al procesar la solicitud", // Mensaje del error.
                error.status || 500 // Código de estado HTTP del error.
            );
        }
    }

    public async update({ params, request }: HttpContextContract) {
        const theOwner: Owner = await Owner.findOrFail(params.id);
        await request.validate(OwnerValidator);
        const body = request.body();
        theOwner.merge(body);
        return await theOwner.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOwner: Owner = await Owner.findOrFail(params.id);
        response.status(204).json({ message: 'Owner eliminado correctamente' });
        return await theOwner.delete();
    }
}