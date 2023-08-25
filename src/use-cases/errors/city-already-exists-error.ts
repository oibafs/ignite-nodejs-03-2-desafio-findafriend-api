export class CityAlreadyExistsError extends Error {
  constructor() {
    super('City already exists')
  }
}
