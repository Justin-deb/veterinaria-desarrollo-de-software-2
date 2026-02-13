import type { Pet } from "./Pet.model";

export interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  petList: Pet[];
}