import { FastifyInstance } from 'fastify'
import { statesWithCitiesAvailable } from './states-with-cities-available'
import { citiesByState } from './fetch-by-state'

export async function citiesRoutes(app: FastifyInstance) {
  app.get('/states', statesWithCitiesAvailable)
  app.get('/cities', citiesByState)
}
