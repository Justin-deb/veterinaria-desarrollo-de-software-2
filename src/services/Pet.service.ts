import type { Client } from "../models/Client.model"
import type { Pet } from "../models/Pet.model"
import { getClientByID } from "./Client.service"

const PETS_URL = "../../public/data/Data.json" 

export async function getPets(clientID:string): Promise<Pet[]> {
  const client:Client|null = await getClientByID(clientID);
  if (client) {
    throw new Error(`Can't load data ${PETS_URL}`)
  }

  return client!.petList;
}

export async function getPetByName(name: string,clientID:string): Promise<Pet | null> {
  const pets = await getPets(clientID);
  const found = pets.find(p => p.petName === name)
  return found ?? null
}
