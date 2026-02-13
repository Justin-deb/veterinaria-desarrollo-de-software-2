export interface Pet{
    petName: string,
    species: string,
    breed: string,
    age: number,
    appointmentDescriptions: string [],
    vaccines: string [],
    appointments: Appointment []

}

export interface Appointment {
  date: string
  service: string
  veterinarian: string
}