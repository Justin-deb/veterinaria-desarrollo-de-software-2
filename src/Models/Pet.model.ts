import type { Appointment } from "./Appoiment.model";

export interface Pet {
  petName: string;
  species: string;
  breed: string;
  age: number;
  appointmentDescriptions: string[];
  vaccines: string[];
  appointments: Appointment[];
}
