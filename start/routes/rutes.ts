import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/rutes", "RutesController.find");
    Route.get("/rutes/:id", "RutesController.find");
    Route.post("/rutes", "RutesController.create");
    Route.put("/rutes/:id", "RutesController.update");
    Route.delete("/rutes/:id", "RutesController.delete");
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion