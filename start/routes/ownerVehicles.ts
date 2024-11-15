import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/ownerVehicles", "OwnerVehiclesController.find");  // Obtener todas las relaciones propietario-vehículo
    Route.get("/ownerVehicles/:id", "OwnerVehiclesController.find");  // Obtener una relación propietario-vehículo por ID
    Route.post("/ownerVehicles", "OwnerVehiclesController.create");  // Crear una relación propietario-vehículo
    Route.put("/ownerVehicles/:id", "OwnerVehiclesController.update");  // Actualizar una relación propietario-vehículo
    Route.delete("/ownerVehicles/:id", "OwnerVehiclesController.delete");  // Eliminar una relación propietario-vehículo
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion