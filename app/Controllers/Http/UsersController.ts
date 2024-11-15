import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import UserValidator from 'App/Validators/UserValidator';

export default class UsersController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await User.query()
        .where('id', params.id)
        .preload('driver')
        .preload('owner').firstOrFail();
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await User.query().preload('driver').preload('owner').paginate(page, perPage);
      } else {
        return await User.query().preload('driver').preload('owner');
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(UserValidator);
    const body = request.body();
    const theUser: User = await User.create(body);
    return theUser;
  }

  public async update({ params, request }: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    await request.validate(UserValidator);
    const body = request.body();
    user.merge(body);
    return await user.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    response.status(204).json({ message: 'User eliminado correctamente' });
    return await user.delete();
  }
}