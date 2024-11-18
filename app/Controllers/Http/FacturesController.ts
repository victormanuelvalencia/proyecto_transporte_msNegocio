import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Facture from 'App/Models/Facture'
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

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

    }
    public async create({ request, response }: HttpContextContract) {
        try {
          // Extrae el cuerpo de la solicitud
          const body = request.body();
    
          // Crear la factura en la base de datos
          const theFacture = await Facture.create(body);
    
          // Construir los datos necesarios para el microservicio de pagos
          const paymentPayload = {
            card_number: body.card_number,
            exp_year: body.exp_year,
            exp_month: body.exp_month,
            cvc: body.cvc,
            name: body.name,
            last_name: body.last_name,
            email: body.email,
            phone: body.phone,
            doc_number: body.doc_number,
            city: body.city,
            address: body.address,
            cell_phone: body.cell_phone,
            bill: body.bill,
            value: body.value,
          };
    
          // Enviar la factura al microservicio de pagos
          const paymentResponse = await axios.post(
            `${Env.get('MS_PAGOS')}/process-payment`, // URL del microservicio de pagos
            paymentPayload
          );
    
          // Verificar si el microservicio retornó un error
          if (paymentResponse.status !== 200) {
            console.error(
              'Error procesando el pago:',
              paymentResponse.data
            );
            return response.status(500).send({
              error: 'Hubo un error procesando el pago. Verifique la información.',
              details: paymentResponse.data,
            });
          }
    
          // Retornar la factura y la respuesta del microservicio
          return response.status(201).send({
            message: 'Factura creada y procesada exitosamente.',
            facture: theFacture,
            payment: paymentResponse.data,
          });
        } catch (error) {
          console.error('Error creando la factura:', error);
    
          if (error.response) {
            return response.status(error.response.status).send({
              error: error.response.data.error || 'Error procesando el pago.',
            });
          }
    
          return response.status(500).send({
            error: 'Ocurrió un error inesperado.',
            details: error.message,
          });
        }
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
}
