import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/driver-vehicles", "DriverVehiclesController.find");
    Route.get("/driver-vehicles/:id", "DriverVehiclesController.find");
    Route.post("/driver-vehicles", "DriverVehiclesController.create");
    Route.put("/driver-vehicles/:id", "DriverVehiclesController.update");
    Route.delete("/driver-vehicles/:id", "DriverVehiclesController.delete");
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion