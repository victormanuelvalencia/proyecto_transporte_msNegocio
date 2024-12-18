import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/restricciones", "RestriccionsController.find");
    Route.get("/restricciones/:id", "RestriccionsController.find");
    Route.post("/restricciones", "RestriccionsController.create");
    Route.put("/restricciones/:id", "RestriccionsController.update");
    Route.delete("/restricciones/:id", "RestriccionsController.delete");
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion