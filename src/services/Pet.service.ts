import type { Client } from "../Models/Client.model"
import type { Pet } from "../Models/Pet.model"

const PETS_URL = "../../public/data/Data.json" // asegúrate de tener public/data/Data.json

export async function getPets(): Promise<Pet[]> {
  const res = await fetch(PETS_URL, { cache: "no-store" })
  if (!res.ok) {
    throw new Error(`No se pudo cargar ${PETS_URL}: ${res.status}`)
  }
  const data: Client[] = await res.json()
  return data.flatMap(c => c.petList)
}

export async function getPetByName(name: string): Promise<Pet | null> {
  const pets = await getPets()
  const found = pets.find(p => p.petName === name)
  return found ?? null
}
