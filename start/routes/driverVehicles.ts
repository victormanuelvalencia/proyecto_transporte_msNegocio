import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/driverVehicles", "DriverVehiclesController.find");
    Route.get("/driverVehicles/:id", "DriverVehiclesController.find");
    Route.post("/driverVehicles", "DriverVehiclesController.create");
    Route.put("/driverVehicles/:id", "DriverVehiclesController.update");
    Route.delete("/driverVehicles/:id", "DriverVehiclesController.delete");
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion