import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/Lotes", "LotesController.find");
    Route.get("/Lotes/:id", "LotesController.find");
    Route.post("/Lotes", "LotesController.create");
    Route.put("/Lotes/:id", "LotesController.update");
    Route.delete("/Lotes/:id", "LotesController.delete");
})