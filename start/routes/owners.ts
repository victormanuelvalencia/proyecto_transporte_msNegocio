import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/owners", "OwnersController.find");  // Obtener todos los propietarios
    Route.get("/owners/:id", "OwnersController.find");  // Obtener un propietario por ID
    Route.post("/owners", "OwnersController.create");  // Crear un propietario
    Route.put("/owners/:id", "OwnersController.update");  // Actualizar un propietario
    Route.delete("/owners/:id", "OwnersController.delete");  // Eliminar un propietario
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion