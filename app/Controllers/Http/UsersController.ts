import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import UserValidator from 'App/Validators/UserValidator';

export default class UsersController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await User.findOrFail(params.id);
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await User.query().paginate(page, perPage);
      } else {
        return await User.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const user = await User.create(body);
    return user;
  }

  public async update({ params, request }: HttpContextContract) {
    await request.validate(UserValidator)
    const user = await User.findOrFail(params.id);
    const body = request.body();
    user.merge(body);
    return await user.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    response.status(204);
    return await user.delete();
  }
}
