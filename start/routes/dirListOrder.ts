import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/dirlistorders", "DirListOrdersController.find");
    Route.get("/dirlistorders/:id", "DirListOrdersController.find");
    Route.post("/dirlistorders", "DirListOrdersController.create");
    Route.put("/dirlistorders/:id", "DirListOrdersController.update");
    Route.delete("/dirlistorders/:id", "DirListOrdersController.delete");
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion

