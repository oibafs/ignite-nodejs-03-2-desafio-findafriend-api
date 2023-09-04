import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PetsRepository, FindManyByCityParams } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findManyByCity(params: FindManyByCityParams) {
    return this.items
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      species: data.species,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independency_level: data.independency_level,
      space_requirement: data.space_requirement,
      pictures: data.pictures?.create ? data.pictures.create : [],
      requirements: data.requirements?.create ? data.requirements.create : [],
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
