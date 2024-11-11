import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/Categories", "CategoriesController.find");
    Route.get("/Categories/:id", "CategoriesController.find");
    Route.post("/Categories", "CategoriesController.create");
    Route.put("/Categories/:id", "CategoriesController.update");
    Route.delete("/Categories/:id", "CategoriesController.delete");
})