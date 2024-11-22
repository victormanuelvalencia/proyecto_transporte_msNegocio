import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/secaddresses", "SecAddressesController.find");
    Route.get("/secaddresses/:id", "SecAddressesController.find");
    Route.post("/secaddresses", "SecAddressesController.create");
    Route.put("/secaddresses/:id", "SecAddressesController.update");
    Route.delete("/secaddresses/:id", "SecAddressesController.delete");
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion