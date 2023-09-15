import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { createCity } from './create-city'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const city = await createCity()

  await prisma.org.create({
    data: {
      name: 'Fictional Org',
      responsible: 'John Doe',
      email: 'fictional.org@example.com',
      address: 'Somewhere Street 123',
      cep: '12345678',
      city_id: city.id,
      whatsapp: '11912345678',
      password_hash: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'fictional.org@example.com',
    password: '123456',
  })

  const { token } = await authResponse.body

  return {
    token,
  }
}
