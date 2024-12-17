import Ws from 'App/Services/Ws'

Ws.boot()
/**
* Listen for incoming socket connections
*/
//Esta clase recibe las personas que se conectan, reciben las peticiones
Ws.io.on('connection', (socket) => {

    console.log("nuevo dispositivo conectado")
    //los sockets tienen un identificador
    let id = socket.id;
    //Y cuando se conecta se puede acceder a algunos temas tecnicos, como el archivo query que me va a decir
    //por ejemplo, el correo del usuario que esta llegando
    const body = socket.handshake.query
    //Mostrar la informacon que viene en el socket por medio de la query
    console.log("body del socket " + JSON.stringify(body))
    console.log("se conectó " + id)
    //ESto es un topico, lo cual es como la variable famosa, lo cual hace que avise a todos los que estan "subscritos" 
    //al servicio, avise que se realizo algun cambio
    socket.emit('notifications', { hello: 'world' })
})