import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Expense from 'App/Models/Expense';
import ExpenseValidator from 'App/Validators/ExpenseValidator';

export default class ExpensesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theExpense: Expense = await Expense.findOrFail(params.id)
            await theExpense.load('service')
            await theExpense.load('driver')

            return theExpense;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) { //aqui es una forma de listar por paginas distintos teatros
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Expense.query().paginate(page, perPage)
            } else {
                return await Expense.query()
            }

        }

    }

    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ request }: HttpContextContract) {
        await request.validate(ExpenseValidator)
        const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
        const theExpense: Expense = await Expense.create(body); //Esto le pide que espere 
        //El await es siempre para hacer consultas en bases de datos 
        //Lo que hace es esperar que el teatro responda
        // await theExpense.load('expense') !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return theExpense;
    }

    public async update({ params, request }: HttpContextContract) {
        const theExpense: Expense = await Expense.findOrFail(params.id);
        const body = request.body();
        theExpense.ammount = body.ammount;
        theExpense.description = body.description;
        theExpense.status = body.status;
        theExpense.service_id = body.service_id;
        theExpense.driver_id = body.driver_id;


        return await theExpense.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theExpense: Expense = await Expense.findOrFail(params.id);
            response.status(204);
            return await theExpense.delete();
    }
}
