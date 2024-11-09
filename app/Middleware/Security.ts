import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'

export default class Security {
  //Tenemos la funcion y entran 2 cosas, la request (la ruta, los headers, el body, etc) y que envie la respuesta
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    //Se obtiene la informacion de la carta (request) en un json
    let theRequest = request.toJSON()

    //para mostrar la carta
    console.log(theRequest);

    //Este condicional va analizar si en los headers viene la autorizacion, que nos sirve para identificar quien esta accediendo
    if(theRequest.headers.authorization){
      //aqui vamos a obtener el token, o sea quien es el usuario que esta entrando
      //Pero el token viene con el header de bearer token, entonces lo que tenemos que haacer es cortar el "Bearer " del resto del token
      //Ej: "Bearer ajsa12131naCXasaf..." despues -> "ajsa12131naCXasaf..."
      let token = theRequest.headers.authorization.replace("Bearer ", "")
      // entonces vamos a armar el permiso como un objeto
      //Entonces sacamos de la request la url y el metodo al que esta intentando acceder. Por ej: "/department" con "GET"
      //Esta es la peticion del cliente
      let thePermission: object = {
        url: theRequest.url,
        method: theRequest.method
      }
      try {
        //Aqui lo que estamos configurando es que se llame al microservicio de seguridad, en el endpoint que tenemos en el securityController
        //Enviamos el thePermission
        const result = await axios.post(`${Env.get('MS_SECURITY')}/api/public/security/permissions-validation`, thePermission,
          {
            //Ademas tambien estoy enviando los headers, con el bearer en este caso
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        console.log("La respuesta de ms-security >" + result.data + "<")
        //Aqui lo que hace es recibir ese booleano del ms de seguridad
        if (result.data == true) {
          console.log(result.data)
          //Y lo deja pasar
          await next()
        } else {
          //Sino que no lo deje ingresar
          console.log("no puede ingresar")
          return response.status(401)
        }
      } catch (error) {
        console.error(error)
        return response.status(401)
      }
  } else{
    return response.status(401)
  }
  }
    
    // code for middleware goes here. ABOVE THE NEXT CALL
    /*console.log("saludando middleware"); //ESto es lo que se llama primero al llamar la ruta protegida, por ej movies
    
    await next() //Aquí es donde se deja pasar a la petición*/
  
}
