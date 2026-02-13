import type { Client } from "../models/Client.model";

const DATA_URL = '/data/Data.json';

export async function LoginClient(email:string,password:string):Promise<string|null>{
    const clients = await getClients();

    const clientLogin:Client | undefined = clients.find((c) => c.email === email && c.password === password);

    if(!clientLogin){
        return null;
    }

    return clientLogin.id;
}

async function getClients():Promise<Client[]>{
    const res = await fetch(DATA_URL);

    if(!res.ok){
        throw new Error(`Couldn't fetch data. (Status: ${res.status})`);
    }

    const data:Client[] = await res.json();

    return data;
}

export async function getClientByID(clientId:string):Promise<Client | null>{
    const clients:Client[] = await getClients();

    const clientFound:Client | undefined = clients.find((c) => {c.id === clientId});

    if(!clientFound){
        throw new Error(`Client not found`);
    }

    return clientFound;
}