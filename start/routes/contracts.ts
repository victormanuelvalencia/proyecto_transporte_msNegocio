import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/Contracts", "ContractsController.find");
    Route.get("/Contracts/:id", "ContractsController.find");
    Route.post("/Contracts", "ContractsController.create");
    Route.put("/Contracts/:id", "ContractsController.update");
    Route.delete("/Contracts/:id", "ContractsController.delete");
})