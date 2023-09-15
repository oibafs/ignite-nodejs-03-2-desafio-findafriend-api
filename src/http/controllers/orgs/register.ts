import { InvalidCityError } from '@/use-cases/errors/invalid-city-error'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    responsible: z.string(),
    email: z.string().email(),
    address: z.string(),
    cep: z.string().regex(/^\d{8}$/),
    city_id: z.string().uuid(),
    whatsapp: z.string().regex(/^[1-9]\d{9,10}$/),
    password: z.string().min(6),
  })

  const {
    name,
    responsible,
    email,
    address,
    cep,
    city_id: cityId,
    whatsapp,
    password,
  } = registerBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      name,
      responsible,
      email,
      address,
      cep,
      cityId,
      whatsapp,
      password,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send(error.message)
    } else if (error instanceof InvalidCityError) {
      return reply.status(400).send(error.message)
    }

    throw error
  }

  return reply.status(201).send()
}
