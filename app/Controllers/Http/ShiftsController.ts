import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Shift from 'App/Models/Shift'
import ShiftValidator from 'App/Validators/ShiftValidator'

export default class ShiftsController {
  public async create({ request }: HttpContextContract) {
    //await request.validate(ShiftValidator)
    const body = request.body();
    const theShift: Shift = await Shift.create(body);
    return theShift;
  }

  public async find({ params, request }: HttpContextContract) {
    if (params.id) {
      return await Shift.query().firstOrFail();
    } else {
        const data = request.all();
        if ('page' in data && 'per_page' in data) {
          const page = request.input('page', 1);
          const perPage = request.input('per_page', 20);
          return await Shift.query().paginate(page, perPage);
        } else {
          return await Shift.query();
        }
      }
  }

  public async delete({ params, response }: HttpContextContract) {
    const shift = await Shift.findOrFail(params.id);
    response.status(204);
    return await shift.delete();
  }

  public async update({ params, request }: HttpContextContract) {
    const shift = await Shift.findOrFail(params.id);
    const body = request.body();
    shift.merge(body);
    return await shift.save();
  }
}