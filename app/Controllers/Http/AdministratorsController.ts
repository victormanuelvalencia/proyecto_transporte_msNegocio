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
         await theAdministrator.load('service');
        
        if (!theUserResponse.data || Object.keys(theUserResponse.data).length === 0) {
          throw new Exception(
            "User not found",
            404
          );
        }
        await theAdministrator.load('service')

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

  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el administratorValidator
      const body = request.body();

      // Llamada al microservicio de usuarios
      const theUserResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${body.user_id}`,
        {
          headers: { Authorization: request.headers().authorization || "" },
        }
      );
      
      // Verificar si no se encontró información del usuario en el microservicio
      if (!theUserResponse.data || Object.keys(theUserResponse.data).length === 0) {
        return response.notFound({
          error:
            "User not found, verify user_id",
        });
      }
      // Crear el administrator si la validación y la verificación de usuario son exitosas
      await request.validate(AdministratorValidator);
      const theAdministrator: Administrator = await Administrator.create(body);
      return theAdministrator;
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const theAdministrator: Administrator = await Administrator.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta

    theAdministrator.phone_number = body.phone_number;
    theAdministrator.active = body.active;
    theAdministrator.service_id = body.service_id;
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