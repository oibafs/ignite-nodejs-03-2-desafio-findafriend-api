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
    cityId: z.string().uuid(),
    whatsapp: z.string().regex(/^[1-9]\d{9,10}$/),
    password: z.string().min(6),
  })

  const { name, responsible, email, address, cep, cityId, whatsapp, password } =
    registerBodySchema.parse(request.body)

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
      return reply.status(409).send()
    }

    throw error
  }

  return reply.status(201).send()
}
