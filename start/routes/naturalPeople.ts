import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/NaturalPeople", "NaturalPersonController.find");
    Route.get("/NaturalPeople/:id", "NaturalPersonController.find");
    Route.post("/NaturalPeople", "NaturalPersonController.create");
    Route.put("/NaturalPeople/:id", "NaturalPersonController.update");
    Route.delete("/NaturalPeople/:id", "NaturalPersonController.delete");
})