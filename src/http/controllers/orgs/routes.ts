import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { details } from './details'

export async function orgsRoutes(app: FastifyInstance) {
  app.get('/orgs/:org_id', details)

  app.post('/orgs', register)
  app.post('/sessions', authenticate)
}
