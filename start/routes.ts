

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import "./routes/categorias"
import "./routes/lotes"
import "./routes/productos"
import "./routes/departments"
import "./routes/municipalities"
import "./routes/addresses"
import "./routes/distributionCenters"