import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/category-products", "CategoryProductsController.find");
    Route.get("/category-products/:id", "CategoryProductsController.find");
    Route.post("/category-products", "CategoryProductsController.create");
    Route.put("/category-products/:id", "CategoryProductsController.update");
    Route.delete("/category-products/:id", "CategoryProductsController.delete");
})