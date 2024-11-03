import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/Productos", "ProductosController.find");
    Route.get("/Productos/:id", "ProductosController.find");
    Route.post("/Productos", "ProductosController.create");
    Route.put("/Productos/:id", "ProductosController.update");
    Route.delete("/Productos/:id", "ProductosController.delete");
})