import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/expenses", "ExpensesController.find");
    Route.get("/expenses/:id", "ExpensesController.find");
    Route.post("/expenses", "ExpensesController.create");
    Route.put("/expenses/:id", "ExpensesController.update");
    Route.delete("/expenses/:id", "ExpensesController.delete");
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion