import { Server } from 'socket.io'

import AdonisServer from '@ioc:Adonis/Core/Server'

//Este archivo esta encargado de inicializar el servicio
class Ws {
    //esto es lo que arranca el servicio de sockets
    public io: Server
    private booted = false
    public boot() {

        /**
        
        * Ignore multiple calls to the boot method
        
        */

        if (this.booted) {
            return
        }

        this.booted = true
        //Esto inicializa el servidor y configura el cors
        this.io = new Server(AdonisServer.instance!, {
            cors: {
                origin: '*'
            }
        })
    }
}

export default new Ws()