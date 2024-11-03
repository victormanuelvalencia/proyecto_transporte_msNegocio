import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/Categorias", "CategoriasController.find");
    Route.get("/Categorias/:id", "CategoriasController.find");
    Route.post("/Categorias", "CategoriasController.create");
    Route.put("/Categorias/:id", "CategoriasController.update");
    Route.delete("/Categorias/:id", "CategoriasController.delete");
})