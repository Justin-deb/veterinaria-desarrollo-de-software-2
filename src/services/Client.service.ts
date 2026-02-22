import type { Client } from "../models/Client.model";

const DATA_URL = "/api/clients";


export async function LoginClient(
  email: string,
  password: string,
): Promise<string | null> {

  const response = await fetch(
    `${DATA_URL}?email=${email}&password=${password}`
  );

  if (!response.ok) {
   throw new Error(`Login request failed (Status: ${response.status})`);
  }

  const clients: Client[] = await response.json();

  if (clients.length === 0) {
    return null;
  }

  return clients[0].id;

}

export async function getClientByID(
  clientId: string,
): Promise<Client | undefined> {
  const response = await fetch(`${DATA_URL}/${clientId}`);

  if (!response.ok) {
    throw new Error("Client not found");
  }

  return response.json();
}

export async function updateClient(
  id: string,
  updatedClient: Client
): Promise<Client> {
  const response = await fetch(`/api/clients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedClient),
  });

  if (!response.ok) {
    throw new Error("Failed to update client");
  }

  return await response.json();
}
