import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { details } from './details'
import { register } from './register'

export async function orgsRoutes(app: FastifyInstance) {
  app.get('/me', { onRequest: [verifyJWT] }, details)

  app.post('/orgs', register)
  app.post('/sessions', authenticate)
}
