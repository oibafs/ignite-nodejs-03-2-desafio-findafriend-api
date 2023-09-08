import { makeFetchPetsByCharacteristicsUseCase } from '@/use-cases/factories/make-fetch-pets-by-characteristics'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function petsByCharacteristics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const petsByCharacteristicsQuerySchema = z.object({
    cityId: z.string(),
    species: z
      .union([z.enum(['DOG', 'CAT']).array(), z.enum(['DOG', 'CAT'])])
      .optional(),
    age: z.enum(['PUP', 'JUNIOR', 'ADULT', 'SENIOR']).optional(),
    size: z.enum(['TINY', 'SMALL', 'MEDIUM', 'LARGE', 'GIANT']).optional(),
    energy_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    independency_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    space_requirement: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const {
    cityId,
    species,
    age,
    size,
    energy_level: energyLevel,
    independency_level: independencyLevel,
    space_requirement: spaceRequirement,
    page,
  } = petsByCharacteristicsQuerySchema.parse(request.query)

  const speciesArray = species
    ? typeof species === 'string'
      ? [species]
      : species
    : undefined

  const fetchPetsByCharacteristicsUseCase =
    makeFetchPetsByCharacteristicsUseCase()

  const { pets } = await fetchPetsByCharacteristicsUseCase.execute({
    cityId,
    species: speciesArray,
    age,
    size,
    energyLevel,
    independencyLevel,
    spaceRequirement,
    page,
  })

  return reply.status(200).send({
    pets,
  })
}
