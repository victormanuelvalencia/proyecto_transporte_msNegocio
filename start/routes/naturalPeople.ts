import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/NaturalPeople", "NaturalPeopleController.find");
    Route.get("/NaturalPeople/:id", "NaturalPeopleController.find");
    Route.post("/NaturalPeople", "NaturalPeopleController.create");
    Route.put("/NaturalPeople/:id", "NaturalPeopleController.update");
    Route.delete("/NaturalPeople/:id", "NaturalPeopleController.delete");
})