import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { petsByCharacteristics } from './fetch-by-characteristics'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', petsByCharacteristics)
  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
