import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/restrictions", "RestrictionsController.find");
    Route.get("/restrictions/:id", "RestrictionsController.find");
    Route.post("/restrictions", "RestrictionsController.create");
    Route.put("/restrictions/:id", "RestrictionsController.update");
    Route.delete("/restrictions/:id", "RestrictionsController.delete");
})