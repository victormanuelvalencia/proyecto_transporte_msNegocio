import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Shift from 'App/Models/Shift'
import Driver from 'App/Models/Driver'
import ShiftValidator from 'App/Validators/ShiftValidator'

export default class ShiftsController {
  // Crear un turno
  public async create({ request, response }: HttpContextContract) {
    const data = request.only(['driver_id', 'start_time', 'end_time', 'date'])

    const driver = await Driver.find(data.driver_id)
    if (!driver) {
      return response.status(404).send('Driver not found')
    }

    const shift = await Shift.create(data)

    return response.status(201).send(shift)
  }

  // Obtener los turnos de un conductor
  public async find({ params, response, request }: HttpContextContract) {
    await request.validate(ShiftValidator)
    const driver = await Driver.find(params.id)
    if (!driver) {
      return response.status(404).send('Driver not found')
    }

    const shifts = await driver.related('shifts').query()

    return response.status(200).send(shifts)
  }

  // Eliminar un turno
  public async delete({ params, response }: HttpContextContract) {
    const shift = await Shift.find(params.id)
    if (!shift) {
      return response.status(404).send('Shift not found')
    }

    await shift.delete()

    return response.status(200).send('Shift deleted successfully')
  }
}
