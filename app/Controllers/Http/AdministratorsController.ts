import { Exception } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Administrator from "App/Models/Administrator";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import AdministratorValidator from "App/Validators/AdministratorValidator";

export default class AdministratorsController {
  public async find({ request, params }: HttpContextContract) {
     
    try {
      if (params.id) {
        //Creamos una instancia de administrator
        let theAdministrator: Administrator = await Administrator.findOrFail(params.id);
        // llamamos al microservicio de seguridad en users
        const theUserResponse = await axios.get(
          `${Env.get("MS_SECURITY")}/users/${theAdministrator.user_id}`,
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
        await theAdministrator.load('hotel')
        await theAdministrator.load('restaurant')

        return { administrator: theAdministrator, user: theUserResponse.data };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          return await Administrator.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
        } else {
          return await Administrator.query(); //es para que espere a la base de datos
        }
      }
    } catch (error) {
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

    // Definimos el metodo que recibe un objeto con una request http y una respuesta 
    public async create({ request, response }: HttpContextContract) { 
      try {
        //Extrae el cuerpo de la solicitud http, que contiene los datos del nuevo conductor
        const body = request.body(); 
  
        //Validar datos del usuario en el microservicio de seguridad
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
  
        // Crear el conductor.
        await request.validate(AdministratorValidator); // Validador
        const theAdministrator = await Administrator.create(body); // Crea un nuevo registro de conductor en la bd
  
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
        
        // Devuelve el conductor
        return theAdministrator;  
        
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
    const theAdministrator: Administrator = await Administrator.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta

    theAdministrator.phone_number = body.phone_number;
    theAdministrator.active = body.active;
    theAdministrator.hotel_id = body.hotel_id
    theAdministrator.restaurant_id = body.restaurant_id
    theAdministrator.user_id = body.user_id;



    return await theAdministrator.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theTheater: Administrator = await Administrator.findOrFail(params.id); //buscarlo
    response.status(204);

    return await theTheater.delete(); //el teatro que se encontro, eliminelo
  }
}