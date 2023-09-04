import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { petsByCity } from './fetch-by-city'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', petsByCity)
  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
