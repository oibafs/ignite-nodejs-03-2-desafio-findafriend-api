import { prisma } from '@/lib/prisma'

export async function createCity() {
  const city = await prisma.city.create({
    data: {
      name: 'Recife',
      state: 'PE',
    },
  })

  return city
}
