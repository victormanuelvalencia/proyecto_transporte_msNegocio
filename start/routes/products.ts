import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/Products", "ProductsController.find");
    Route.get("/Products/:id", "ProductsController.find");
    Route.post("/Products", "ProductsController.create");
    Route.put("/Products/:id", "ProductsController.update");
    Route.delete("/Products/:id", "ProductsController.delete");
})