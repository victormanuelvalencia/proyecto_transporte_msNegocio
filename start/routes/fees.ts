import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/Fees", "FeesController.find");
    Route.get("/Fees/:id", "FeesController.find");
    Route.post("/Fees", "FeesController.create");
    Route.put("/Fees/:id", "FeesController.update");
    Route.delete("/Fees/:id", "FeesController.delete");
})