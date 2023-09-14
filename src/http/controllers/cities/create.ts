import { CityAlreadyExistsError } from '@/use-cases/errors/city-already-exists-error'
import { makeCreateCityUseCase } from '@/use-cases/factories/make-create-city-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    state: z.enum([
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MT',
      'MS',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO',
    ]),
  })

  const { name, state } = createBodySchema.parse(request.body)

  try {
    const createCityUseCase = makeCreateCityUseCase()

    await createCityUseCase.execute({
      name,
      state,
    })
  } catch (error) {
    if (error instanceof CityAlreadyExistsError) {
      return reply.status(409).send(error.message)
    }

    throw error
  }

  return reply.status(201).send()
}
