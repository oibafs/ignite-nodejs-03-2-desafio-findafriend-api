import { makeFetchCitiesByStateUseCase } from '@/use-cases/factories/make-fetch-cities-by-state'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function citiesByState(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const citiesByStateQuerySchema = z.object({
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
    page: z.coerce.number().min(1).default(1),
  })

  const { state, page } = citiesByStateQuerySchema.parse(request.query)

  const fetchCitiesByStateUseCase = makeFetchCitiesByStateUseCase()

  const { cities } = await fetchCitiesByStateUseCase.execute({
    state,
    page,
  })

  return reply.status(200).send({
    cities,
  })
}
