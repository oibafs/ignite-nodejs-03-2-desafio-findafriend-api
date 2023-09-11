import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { petsByCharacteristics } from './fetch-by-characteristics'
import { details } from './details'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:pet_id', details)
  app.get('/pets', petsByCharacteristics)
  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
