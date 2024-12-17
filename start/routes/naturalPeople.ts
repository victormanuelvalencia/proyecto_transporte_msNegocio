import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/natural-person", "NaturalPersonController.find");
    Route.get("/natural-person/:id", "NaturalPersonController.find");
    Route.post("/natural-person", "NaturalPersonController.create");
    Route.put("/natural-person/:id", "NaturalPersonController.update");
    Route.delete("/natural-person/:id", "NaturalPersonController.delete");
})