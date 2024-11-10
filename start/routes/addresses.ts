import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/addresses", "AddressesController.find");
    Route.get("/addresses/:id", "AddressesController.find");
    Route.post("/addresses", "AddressesController.create");
    Route.put("/addresses/:id", "AddressesController.update");
    Route.delete("/addresses/:id", "AddressesController.delete");
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion