import { makeFetchStatesWithCitiesAvailableUseCase } from '@/use-cases/factories/make-fetch-states-with-cities-available-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function statesWithCitiesAvailable(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchStatesWithCitiesAvailableUseCase =
    makeFetchStatesWithCitiesAvailableUseCase()

  const { states } = await fetchStatesWithCitiesAvailableUseCase.execute()

  return reply.status(200).send({
    states,
  })
}
