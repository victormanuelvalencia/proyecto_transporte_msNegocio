import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/Companies", "CompaniesController.find");
    Route.get("/Companies/:id", "CompaniesController.find");
    Route.post("/Companies", "CompaniesController.create");
    Route.put("/Companies/:id", "CompaniesController.update");
    Route.delete("/Companies/:id", "CompaniesController.delete");
})