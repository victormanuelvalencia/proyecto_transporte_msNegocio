import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/factures", "FacturesController.find");
    Route.get("/factures/:id", "FacturesController.find");
    Route.post("/factures", "FacturesController.create");
    Route.put("/factures/:id", "FacturesController.update");
    Route.delete("/factures/:id", "FacturesController.delete");
})