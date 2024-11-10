import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/distributioncenters", "DistributionCentersController.find");
    Route.get("/distributioncenters/:id", "DistributionCentersController.find");
    Route.post("/distributioncenters", "DistributionCentersController.create");
    Route.put("/distributioncenters/:id", "DistributionCentersController.update");
    Route.delete("/distributioncenters/:id", "DistributionCentersController.delete");
})
//.middleware(['security']) //quitar en caso de que se quiera acceder sin necesidad de la autentificacion