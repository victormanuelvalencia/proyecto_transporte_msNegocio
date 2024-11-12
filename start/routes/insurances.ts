import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/insurances", "InsurancesController.find");  // Obtener todos los seguros
    Route.get("/insurances/:id", "InsurancesController.find");  // Obtener un seguro por ID
    Route.post("/insurances", "InsurancesController.create");  // Crear un seguro
    Route.put("/insurances/:id", "InsurancesController.update");  // Actualizar un seguro
    Route.delete("/insurances/:id", "InsurancesController.delete");  // Eliminar un seguro
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion