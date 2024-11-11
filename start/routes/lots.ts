import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/Lots", "LotsController.find");
    Route.get("/Lots/:id", "LotsController.find");
    Route.post("/Lots", "LotsController.create");
    Route.put("/Lots/:id", "LotsController.update");
    Route.delete("/Lots/:id", "LotsController.delete");
})