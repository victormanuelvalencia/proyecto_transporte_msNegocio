import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/vehicles", "VehiclesController.find");
    Route.get("/vehicles/:id", "VehiclesController.find");
    Route.post("/vehicles", "VehiclesController.create");
    Route.put("/vehicles/:id", "VehiclesController.update");
    Route.delete("/vehicles/:id", "VehiclesController.delete");
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion