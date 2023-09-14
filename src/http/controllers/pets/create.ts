import { InvalidOrgError } from '@/use-cases/errors/invalid-org-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    species: z.enum(['DOG', 'CAT']),
    age: z.enum(['PUP', 'JUNIOR', 'ADULT', 'SENIOR']),
    size: z.enum(['TINY', 'SMALL', 'MEDIUM', 'LARGE', 'GIANT']),
    energy_level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    independency_level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    space_requirement: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    pictures: z.array(z.object({ url: z.string() })).optional(),
    requirements: z.array(z.object({ description: z.string() })).optional(),
  })

  const {
    name,
    description,
    species,
    age,
    size,
    energy_level: energyLevel,
    independency_level: independencyLevel,
    space_requirement: spaceRequirement,
    pictures,
    requirements,
  } = createGymBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      name,
      description,
      species,
      age,
      size,
      energyLevel,
      independencyLevel,
      spaceRequirement,
      pictures: {
        create: pictures,
      },
      requirements: {
        create: requirements,
      },
      orgId: request.user.sub,
    })
  } catch (error) {
    if (error instanceof InvalidOrgError) {
      return reply.status(400).send(error.message)
    }

    throw error
  }

  return reply.status(201).send()
}
