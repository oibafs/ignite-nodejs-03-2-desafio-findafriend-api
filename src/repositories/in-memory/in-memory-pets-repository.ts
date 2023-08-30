import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independency_level: data.independency_level,
      space_requirement: data.space_requirement,
      pictures: data.pictures ? data.pictures : [],
      requirements: data.requirements ? data.requirements : [],
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
