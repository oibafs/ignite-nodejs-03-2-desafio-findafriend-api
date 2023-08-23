import { FastifyReply, FastifyRequest } from 'fastify'
import { registerOrgUseCase } from 'src/use-cases/register-org'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    responsible: z.string(),
    email: z.string().email(),
    address: z.string(),
    cep: z.string().regex(/^\d{8}$/),
    cityId: z.string().uuid(),
    whatsapp: z.string().regex(/^[1-9]\d{9,10}$/),
    password: z.string().min(6),
  })

  const { name, responsible, email, address, cep, cityId, whatsapp, password } =
    registerBodySchema.parse(request.body)

  try {
    await registerOrgUseCase({
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
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
