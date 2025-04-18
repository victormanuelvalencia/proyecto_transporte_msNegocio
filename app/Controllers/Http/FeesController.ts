import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fee from 'App/Models/Fee'
import Ws from 'App/Services/Ws';

export default class FeeController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theFee: Fee = await Fee.findOrFail(params.id)
            await theFee.load("contract");
            await theFee.load("facture");
            return theFee;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Fee.query().paginate(page, perPage)
            } else {
                return await Fee.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theFee: Fee = await Fee.create(body);
        return theFee;
    }

    public async update({ params, request }: HttpContextContract) {
        const theFee: Fee = await Fee.findOrFail(params.id);
        const body = request.body();
        theFee.merge(body);
        return await theFee.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theFee: Fee = await Fee.findOrFail(params.id);
            response.status(204);
            return await theFee.delete();
    }

    public async notificar({ response }: HttpContextContract) {
                Ws.io.emit('notifications', { message: 'end process bioinformatic backend' })
                response.status(200);
                return {
                    "message":"ok"
                };
            }
        
}
