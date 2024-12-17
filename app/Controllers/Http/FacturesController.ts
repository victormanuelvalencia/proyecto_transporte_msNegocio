import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Facture from 'App/Models/Facture'
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
<<<<<<< HEAD

=======
>>>>>>> 7404468652f59efbf4a2ef9de8c00f2e4ed02acc

export default class FactureController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theFacture: Facture = await Facture.findOrFail(params.id)
        await theFacture.load("expense")
        await theFacture.load("fee")
        return theFacture;
    } else {
      const data = request.all()
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Facture.query().paginate(page, perPage)
      } else {
        return await Facture.query()
      }
    }
<<<<<<< HEAD
    public async create({ request }: HttpContextContract) {
      
        // Extraer los datos del cuerpo de la solicitud
        const body = request.body()
      
        // Crear la factura en la base de datos
        const theFacture = await Facture.create(body)
        
        let user = ''
        let ammount = 0
        if(theFacture.fee_id != null && theFacture.expense_id == null){

          await theFacture.load("fee", (expenseQuery) => 
=======
  }

  public async create({ request }: HttpContextContract) {
    // Extraer los datos del cuerpo de la solicitud
    const body = request.body()
    // Crear la factura en la base de datos
    const theFacture = await Facture.create(body)
    await theFacture.load("fee", (expenseQuery) => 
                                              {
                                                expenseQuery.preload("contract", (expenseQuery) => 
>>>>>>> 7404468652f59efbf4a2ef9de8c00f2e4ed02acc
                                                  {
                                                    expenseQuery.preload("customer", (expenseQuery) => 
                                                      {
                                                        expenseQuery.preload("naturalPerson")
                                                      })
                                                  })
<<<<<<< HEAD
          user = theFacture.fee.contract.customer.naturalPerson?.user_id;
          ammount = theFacture.fee.contract.total_amount;

          console.log(user);
          

        } else if (theFacture.fee_id == null && theFacture.expense_id != null){

            await theFacture.load('expense', (expenseQuery) => 
                                                  {
                                                    expenseQuery.preload('owner')})

              
          user = theFacture.expense.owner?.user_id
          ammount = theFacture.expense.ammount

          console.log(user);
          console.log(theFacture.expense.owner);
          
          console.log(theFacture.expense.driver);
          
        }
        
        let theUserResponse = await axios.get(
          `${Env.get("MS_SECURITY")}/users/${user}`,
          {
          headers: { Authorization: request.headers().authorization || "" },
          }
      );
=======
                                              })
    const user = theFacture.fee.contract.customer.naturalPerson?.user_id;
    const theUserResponse = await axios.get(
      `${Env.get("MS_SECURITY")}/users/${user}`,
      {
      headers: { Authorization: request.headers().authorization || "" },
      }
    );
>>>>>>> 7404468652f59efbf4a2ef9de8c00f2e4ed02acc

    //PONER IF..

    if (!theUserResponse.data.email) {
      //VERIFICAR QUE SI ENCONTRÓ EL EMAIL DE ESE USER
      return {
        message: "El correo del usuario no está disponible.",
      };
    }

    const emailPayload = {
      subject: "Nueva factura",
      recipient: theUserResponse.data.email, // ACCEDER AL EMAIL DEL CONDUCTOR QUE HIZO EL GASTO DEL CUAL ES ESA FACTURA
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
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">Correo del usuario:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${theUserResponse.data.email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">Cantidad del contrato:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${ammount}</td>
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
      emailPayload
    );

<<<<<<< HEAD
          // Llamar al microservicio de notificaciones
          const emailResponse = await axios.post(
           `${Env.get("MS_NOTIFICATIONS")}/send-email`,
            emailPayload
          );

          if (!emailResponse.data || emailResponse.status !== 200) {
            console.warn("No se pudo enviar el email de confirmación.");}
          return theFacture;

        
    }
        
 
    
    
    public async update({ params, request }: HttpContextContract) {
        const theFacture: Facture = await Facture.findOrFail(params.id);
        const body = request.body();
    
        theFacture.card_number = body.card_number;
        theFacture.exp_year = body.exp_year;
        theFacture.exp_month = body.exp_month;
        theFacture.cvc = body.cvc;
        theFacture.name = body.name;
        theFacture.last_name = body.last_name;
        theFacture.email = body.email;
        theFacture.phone = body.phone;
        theFacture.doc_number = body.doc_number;
        theFacture.city = body.city;
        theFacture.address = body.address;
        theFacture.cell_phone = body.cell_phone;
        theFacture.bill = body.bill;
        theFacture.value = body.value;
        theFacture.expense_id = body.expense_id;
        theFacture.fee_id = body.fee_id;
    
        return await theFacture.save();
    }
    

    public async delete({ params, response }: HttpContextContract) {
        const theFacture: Facture = await Facture.findOrFail(params.id);
            response.status(204);
            return await theFacture.delete();
    }
=======
    if (!emailResponse.data || emailResponse.status !== 200) {
      console.warn("No se pudo enviar el email de confirmación.");
    }
      return theFacture;
  }
      
  public async update({ params, request }: HttpContextContract) {
      const theFacture: Facture = await Facture.findOrFail(params.id);
      const body = request.body();
      theFacture.card_number = body.card_number;
      theFacture.exp_year = body.exp_year;
      theFacture.exp_month = body.exp_month;
      theFacture.cvc = body.cvc;
      theFacture.name = body.name;
      theFacture.last_name = body.last_name;
      theFacture.email = body.email;
      theFacture.phone = body.phone;
      theFacture.doc_number = body.doc_number;
      theFacture.city = body.city;
      theFacture.address = body.address;
      theFacture.cell_phone = body.cell_phone;
      theFacture.bill = body.bill;
      theFacture.value = body.value;
      theFacture.expense_id = body.expense_id;
      theFacture.fee_id = body.fee_id;
      return await theFacture.save();
  }
  
  public async delete({ params, response }: HttpContextContract) {
      const theFacture: Facture = await Facture.findOrFail(params.id);
        response.status(204);
        return await theFacture.delete();
  }
>>>>>>> 7404468652f59efbf4a2ef9de8c00f2e4ed02acc
}
