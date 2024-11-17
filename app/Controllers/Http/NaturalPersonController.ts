import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NaturalPerson from 'App/Models/NaturalPerson'
import axios from 'axios';
import Env from "@ioc:Adonis/Core/Env";

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

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theNaturalPerson: NaturalPerson = await NaturalPerson.create(body);
        return theNaturalPerson;
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
