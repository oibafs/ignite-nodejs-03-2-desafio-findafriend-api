import { City, Org, Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PetsRepository, FindManyByCityParams } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  public cities: City[] = []
  public orgs: Org[] = []

  async findManyByCity(params: FindManyByCityParams) {
    return this.items
      .filter((item) => {
        const org = this.orgs.find((orgItem) => orgItem.id === item.org_id)
        const city = this.cities.find(
          (cityItem) => cityItem.id === org?.city_id,
        )
        return city?.id === params.cityId
      })
      .slice((params.page - 1) * 20, params.page * 20)
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
