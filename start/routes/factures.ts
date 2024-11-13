import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/Factures", "FacturesController.find");
    Route.get("/Factures/:id", "FacturesController.find");
    Route.post("/Factures", "FacturesController.create");
    Route.put("/Factures/:id", "FacturesController.update");
    Route.delete("/Factures/:id", "FacturesController.delete");
})