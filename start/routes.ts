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
import "./routes/users"
import "./routes/drivers"