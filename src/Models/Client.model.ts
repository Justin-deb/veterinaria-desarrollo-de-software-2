import type { Pet } from "./Pet.model";

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  petList: Pet[];
}