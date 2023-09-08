import { City, Org, Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import {
  PetsRepository,
  FindManyByCityParams,
  FindManyByCharacteristicsParams,
} from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  public cities: City[] = []
  public orgs: Org[] = []

  async findManyByCity(params: FindManyByCityParams) {
    const { cityId, page } = params

    return this.items
      .filter((item) => {
        const org = this.orgs.find((orgItem) => orgItem.id === item.org_id)
        const city = this.cities.find(
          (cityItem) => cityItem.id === org?.city_id,
        )
        return city?.id === cityId
      })
      .slice((page - 1) * 20, page * 20)
  }

  async findManyByCharacteristics(params: FindManyByCharacteristicsParams) {
    const {
      cityId,
      species,
      age,
      size,
      energyLevel,
      independencyLevel,
      spaceRequirement,
      page,
    } = params

    return this.items
      .filter((item) => {
        const org = this.orgs.find((orgItem) => orgItem.id === item.org_id)
        const city = this.cities.find(
          (cityItem) => cityItem.id === org?.city_id,
        )

        return (
          city?.id === cityId &&
          (species && species.length !== 0
            ? species.includes(item.species)
            : true) &&
          (age ? item.age === age : true) &&
          (size ? item.size === size : true) &&
          (energyLevel ? item.energy_level === energyLevel : true) &&
          (independencyLevel
            ? item.independency_level === independencyLevel
            : true) &&
          (spaceRequirement
            ? item.space_requirement === spaceRequirement
            : true)
        )
      })
      .slice((page - 1) * 20, page * 20)
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
