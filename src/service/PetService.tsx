import type { Pet } from "../types/Pet"

const PETS_URL = "/data/Data.json"

type PetsDataFile = {
  petList?: Pet[]
}

export async function getPets(): Promise<Pet[]> {
  const response = await fetch(PETS_URL)

  if (!response.ok) {
    throw new Error("No se pudo cargar Data.json: " + response.status)
  }

  const data = await response.json() as PetsDataFile[]

  const pets: Pet[] = data.flatMap(item => item.petList ?? [])

  return pets
}

export async function getPetByName(name: string): Promise<Pet | null> {
  const pets = await getPets()
  const found = pets.find(p => p.petName === name)
  return found ?? null
}
