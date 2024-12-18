import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/fees", "FeesController.find");
    Route.get("/fees/:id", "FeesController.find");
    Route.post("/fees/create", "FeesController.create");
    Route.put("/fees/:id", "FeesController.update");
    Route.delete("/fees/:id", "FeesController.delete");
    Route.post("/fees/notificar", "FeesController.notificar")
}).middleware(['security'])
