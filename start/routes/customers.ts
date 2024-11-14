import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/Customers", "CustomersController.find");
    Route.get("/Customers/:id", "CustomersController.find");
    Route.post("/Customers", "CustomersController.create");
    Route.put("/Customers/:id", "CustomersController.update");
    Route.delete("/Customers/:id", "CustomersController.delete");
})