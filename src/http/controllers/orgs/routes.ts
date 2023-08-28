import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
}
