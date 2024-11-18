import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NaturalPerson from 'App/Models/NaturalPerson'
import Env from "@ioc:Adonis/Core/Env";
import axios from 'axios';
import NaturalPersonValidator from 'App/Validators/NaturalPersonValidator';

export default class NaturalPersonController {
    public async find({ request, params }: HttpContextContract) {
        try {
            if (params.id) {
                let theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(params.id)
                // llamamos al microservicio de seguridad en users
                const theUserResponse = await axios.get(
                    `${Env.get("MS_SECURITY")}/users/${theNaturalPerson.user_id}`,
                    {
                    headers: { Authorization: request.headers().authorization || "" },
                    }
                );
                await theNaturalPerson.load("company")
                //await theNaturalPerson.load("customer")
                if (!theUserResponse.data || Object.keys(theUserResponse.data).length === 0) {
                    throw new Exception(
                    "User not found",
                    404
                    );
                }
                await theNaturalPerson.load("company")
                //await theNaturalPerson.load("customer")
    
                return { naturalPerson: theNaturalPerson, user: theUserResponse.data };
            } else {
                const data = request.all()
                if ("page" in data && "per_page" in data) {
                    const page = request.input('page', 1);
                    const perPage = request.input("per_page", 20);
                    return await NaturalPerson.query().paginate(page, perPage)
                } else {
                    return await NaturalPerson.query()
                }

            }
        } catch (error) {
            throw new Exception(
                error.message || "Error al procesar la solicitud",
                error.status || 500
            );
        }
    }

    public async create({ request, response }: HttpContextContract) {
        try {
            const body = request.body();
            const theUserResponse = await axios.get(
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

            // Crear la persona natural
            await request.validate(NaturalPersonValidator); // Validador
            const theNaturalPerson = await NaturalPerson.create(body); // Crea un nuevo registro de conductor en la bd

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
            
            // Devuelve la persona natural
            return theNaturalPerson;  
        
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
        const theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(params.id);
        const body = request.body();
        theNaturalPerson.merge(body);
        return await theNaturalPerson.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(params.id);
        response.status(204);
        return await theNaturalPerson.delete();
    }
}
