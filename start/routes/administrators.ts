import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/administrators", "AdministratorsController.find");
    Route.get("/administrators/:id", "AdministratorsController.find");
    Route.post("/administrators", "AdministratorsController.create");
    Route.put("/administrators/:id", "AdministratorsController.update");
    Route.delete("/administrators/:id", "AdministratorsController.delete");
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion