import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Restriction from 'App/Models/Restriction';
import RestrictionValidator from 'App/Validators/RestrictionValidator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

export default class RestrictionsController {
// Crear una nueva restricción y notificar a los dueños de vehículos relacionados.
  public async create({ request, response }: HttpContextContract) {
    // Validar datos de entrada
    await request.validate(RestrictionValidator);

    // Extraer datos de la restricción
    const restrictionData = request.only(['description', 'municipality_id']);

    // Crear la restricción en la base de datos
    const restriction = await Restriction.create(restrictionData);

    // Cargar relaciones necesarias para identificar los dueños
    await restriction.load('municipality', (municipalityQuery) => {
      municipalityQuery.preload('operation', (operationQuery) => {
        operationQuery.preload('vehicle', (vehicleQuery) => {
          vehicleQuery.preload('ownerVehicle', (ownerVehicleQuery) => {
            ownerVehicleQuery.preload('owner'); // Relación con los dueños
          });
        });
      });
    });

    // Extraer IDs únicos de dueños
    const ownerIds = restriction.municipality.operation
      .flatMap((operation) =>
        operation.vehicle.ownerVehicle.map((ownerVehicle) => ownerVehicle.owner.user_id)
      )
      .filter((value, index, self) => self.indexOf(value) === index);

    if (ownerIds.length === 0) {
      return response.status(200).send({
        message: 'No se encontraron dueños de vehículos para notificar.',
      });
    }

    // Consultar correos electrónicos desde el MS de seguridad
    const userEmailsResponse = await axios.post(
      `${Env.get('MS_SECURITY')}/users/emails`,
      { user_ids: ownerIds },
      { headers: { Authorization: request.headers().authorization || '' } }
    );

    const userEmails = userEmailsResponse.data?.emails || [];
    if (userEmails.length === 0) {
      return response.status(200).send({
        message: 'No se pudieron obtener correos electrónicos de los dueños.',
      });
    }

    // Preparar el contenido del correo
    const emailPayload = {
      subject: `Nueva restricción en ${restriction.municipality.name}`,
      recipients: userEmails,
      body_html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #007BFF; color: #fff; padding: 15px; text-align: center;">
              <h2 style="margin: 0; font-size: 20px;">Nueva restricción en ${restriction.municipality.name}</h2>
            </div>
            <div style="padding: 20px;">
              <p>Estimado usuario,</p>
              <p>Se ha implementado una nueva restricción en el municipio de ${restriction.municipality.name}. Por favor, revise los detalles y ajuste sus operaciones si es necesario.</p>
              <p><b>Descripción de la restricción:</b> ${restriction.description}</p>
              <p style="margin-top: 20px;">Si tiene alguna pregunta, no dude en ponerse en contacto con nosotros.</p>
              <p>Gracias por utilizar nuestros servicios.</p>
              <p style="margin-top: 20px;"><b>Atentamente,</b></p>
              <p>Gestión de servicios de carga de productos</p>
            </div>
            <div style="background-color: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; color: #555;">
              <p style="margin: 0;">Este es un mensaje automático. Por favor, no responda a este correo.</p>
            </div>
          </div>
        </div>
      `,
    };

    // Enviar correos electrónicos a través del MS de notificaciones
    const emailResponse = await axios.post(`${Env.get('MS_NOTIFICATIONS')}/send-email`, emailPayload);

    if (!emailResponse.data || emailResponse.status !== 200) {
      console.warn('No se pudo enviar el email de notificación.');
    }

    return response.created({
      message: 'Restricción creada y correos enviados.',
      restriction,
    });
  }

  // Buscar restricciones por ID o listar con paginación.
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const restriction = await Restriction.findOrFail(params.id);
      await restriction.load('municipality');
      return restriction;
    } else {
      const { page = 1, per_page = 20 } = request.qs();
      return await Restriction.query().paginate(page, per_page);
    }
  }

  /**
   * Eliminar una restricción por ID.
   */
  public async delete({ params, response }: HttpContextContract) {
    const restriction = await Restriction.findOrFail(params.id);
    await restriction.delete();
    return response.status(204).json({ message: 'Restricción eliminada correctamente' });
  }
}
