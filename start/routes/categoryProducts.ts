import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/CategoryProducts", "CategoryProductsController.find");
    Route.get("/CategoryProducts/:id", "CategoryProductsController.find");
    Route.post("/CategoryProducts", "CategoryProductsController.create");
    Route.put("/CategoryProducts/:id", "CategoryProductsController.update");
    Route.delete("/CategoryProducts/:id", "CategoryProductsController.delete");
})