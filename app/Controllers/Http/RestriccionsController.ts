import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Restriccion from 'App/Models/Restriccion';
import RestriccionValidator from 'App/Validators/RestriccionValidator';
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";


export default class RestriccionsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRestriccion: Restriccion = await Restriccion.findOrFail(params.id)
            await theRestriccion.load('municipality')

            return theRestriccion;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) { //aqui es una forma de listar por paginas distintos teatros
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Restriccion.query().paginate(page, perPage)
            } else {
                return await Restriccion.query()
            }

        }

    }

    //Es una funcion asincrona, que hace que se pueda hacer el create en paralelo 
    //con otras peticiones de manera simultanea
    public async create({ request }: HttpContextContract) {
        await request.validate(RestriccionValidator)
        const body = request.body(); //La request es toda la carta, se lee el contenido y queda en el body
        const theRestriccion: Restriccion = await Restriccion.create(body); //Esto le pide que espere 
        
        await theRestriccion.load("municipality", (expenseQuery) =>
                                                                {
                                                                    expenseQuery.preload('operation', (expenseQuery) =>
                                                                        {
                                                                            expenseQuery.preload('vehicle', (expenseQuery) =>
                                                                                {
                                                                                    expenseQuery.preload('driverVehicle', (expenseQuery) =>
                                                                                        {
                                                                                            expenseQuery.preload('driver')
                                                                                        })
                                                                                })
                                                                        })
                                                                })
        let driver = ""
        const operations = theRestriccion.municipality.operation; // Podrían ser varias operaciones
            for (const operation of operations) {
                const driverVehicles = operation.vehicle.driverVehicle; // Podrían ser varios vehículos
                for (const driverVehicle of driverVehicles) {
                    driver = driverVehicle.driver?.user_id; // Podrían ser múltiples relaciones
                   }}
                
        const theDriverResponse = await axios.get(
                `${Env.get("MS_SECURITY")}/users/${driver}`,
                          {
                              headers: { Authorization: request.headers().authorization || "" },
                          }
                          );
                                                        
                                                              //PONER IF..
                                                        
                                                            if (!theDriverResponse.data.email) {
                                                              //VERIFICAR QUE SI ENCONTRÓ EL EMAIL DE ESE USER
                                                              return {
                                                                message: "El correo del usuario no está disponible.",
                                                              };
                                                            }
                                                        
                                                            const emailRestriccion = {
                                                              subject: "Alerta de restriccion",
                                                              recipient: theDriverResponse.data.email, // ACCEDER AL EMAIL DEL CONDUCTOR QUE HIZO EL GASTO DEL CUAL ES ESA FACTURA
                                                              body_html: `
                                                                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                                                                  <div style="max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                                                                    <div style="background-color: #007BFF; color: #fff; padding: 15px; text-align: center;">
                                                                      <h2 style="margin: 0; font-size: 20px;">Nueva factura generada</h2>
                                                                    </div>
                                                                    <div style="padding: 20px;">
                                                                      <p>Estimado usuario,</p>
                                                                      <p>Nos complace informarle que se ha generado una nueva factura en nuestro sistema con los siguientes detalles:</p>
                                                                      <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
                                                                        <tr style="background-color: #f8f9fa; border-bottom: 2px solid #ddd;">
                                                                          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Detalle</th>
                                                                          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Información</th>
                                                                        </tr>
                                                                        <tr>
                                                                          <td style="padding: 10px; border-bottom: 1px solid #ddd;">ID de la factura:</td>
                                                                          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${theRestriccion.descripcion}</td>
                                                                        </tr>
                                                                        <tr>
                                                                          <td style="padding: 10px; border-bottom: 1px solid #ddd;">Correo del usuario:</td>
                                                                          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${theDriverResponse.data.email}</td>
                                                                        </tr>
                                                                        <tr>
                                                                          <td style="padding: 10px; border-bottom: 1px solid #ddd;">Cantidad del contrato:</td>
                                                                          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${theRestriccion.fecha_inicio}</td>
                                                                        </tr>
                                                                      </table>
                                                                      <p style="margin-top: 20px;">Si tiene alguna pregunta o necesita más información, no dude en ponerse en contacto con nosotros.</p>
                                                                      <p>Gracias por utilizar nuestros servicios.</p>
                                                                      <p style="margin-top: 20px;"><b>Atentamente,</b></p>
                                                                      <p>Gestión de servicios de carga de productos</p>
                                                                    </div>
                                                                    <div style="background-color: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; color: #555;">
                                                                      <p style="margin: 0;">Este es un mensaje automático. Por favor, no responda a este correo.</p>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              `
                                                          };
                                                          
                                                        
                                                                  // Llamar al microservicio de notificaciones
                                                                  const emailResponse = await axios.post(
                                                                   `${Env.get("MS_NOTIFICATIONS")}/send-email`,
                                                                    emailRestriccion
                                                                  );
                                                        
                                                                  if (!emailResponse.data || emailResponse.status !== 200) {
                                                                    console.warn("No se pudo enviar el email de confirmación.");}
                                                                  
        return theRestriccion;
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRestriccion: Restriccion = await Restriccion.findOrFail(params.id);
            response.status(204);
            return await theRestriccion.delete();
    }
}
