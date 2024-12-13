import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department';
import DepartmentValidator from 'App/Validators/DepartmentValidator';

export default class DepartmentsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDepartment: Department = await Department.findOrFail(params.id)
            await theDepartment.load('municipality')
            return theDepartment;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) { //aqui es una forma de listar por paginas distintos teatros
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Department.query().paginate(page, perPage)
            } else {
                return await Department.query()
            }
        }
    }

    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ request }: HttpContextContract) {
        await request.validate(DepartmentValidator)
        const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
        const theDepartment: Department = await Department.create(body); //Esto le pide que espere 
        return theDepartment;
    }

    public async update({ params, request }: HttpContextContract) {
        const theDepartment: Department = await Department.findOrFail(params.id);
        const body = request.body();
        theDepartment.merge(body);
        return await theDepartment.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDepartment: Department = await Department.findOrFail(params.id);
            response.status(204);
            return await theDepartment.delete();
    }
}
