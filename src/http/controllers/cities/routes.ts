import { FastifyInstance } from 'fastify'
import { create } from './create'
import { details } from './details'
import { citiesByState } from './fetch-by-state'
import { statesWithCitiesAvailable } from './states-with-cities-available'

export async function citiesRoutes(app: FastifyInstance) {
  app.get('/states', statesWithCitiesAvailable)
  app.get('/cities/:city_id', details)
  app.get('/cities', citiesByState)
  app.post('/cities', create)
}
