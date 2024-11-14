import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import "./routes/categories"
import "./routes/lots"
import "./routes/products"
import "./routes/departments"
import "./routes/municipalities"
import "./routes/addresses"
import "./routes/distributionCenters"
import "./routes/operations"
import "./routes/vehicles"
import "./routes/dirListOrder"
import "./routes/rutes"
import "./routes/insurances"
import "./routes/ownerVehicles"
import "./routes/owners"
<<<<<<< HEAD
import "./routes/users"
import "./routes/drivers"
=======
import "./routes/categoryProducts"
import "./routes/companies"
import "./routes/contracts"
import "./routes/customers"
import "./routes/factures"
import "./routes/fees"
import "./routes/naturalPeople"
>>>>>>> d5b2ce5fb7b893ffa368002928d26269c7b9ec96
