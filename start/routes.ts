

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
