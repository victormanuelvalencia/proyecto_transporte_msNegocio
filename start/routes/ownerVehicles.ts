import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/owner-vehicles", "OwnerVehiclesController.find");  // Obtener todas las relaciones propietario-vehículo
    Route.get("/owner-vehicles/:id", "OwnerVehiclesController.find");  // Obtener una relación propietario-vehículo por ID
    Route.post("/owner-vehicles", "OwnerVehiclesController.create");  // Crear una relación propietario-vehículo
    Route.put("/owner-vehicles/:id", "OwnerVehiclesController.update");  // Actualizar una relación propietario-vehículo
    Route.delete("/owner-vehicles/:id", "OwnerVehiclesController.delete");  // Eliminar una relación propietario-vehículo
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion