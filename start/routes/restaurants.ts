import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/restaurants", "RestaurantsController.find");
    Route.get("/restaurants/:id", "RestaurantsController.find");
    Route.post("/restaurants", "RestaurantsController.create");
    Route.put("/restaurants/:id", "RestaurantsController.update");
    Route.delete("/restaurants/:id", "RestaurantsController.delete");
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion