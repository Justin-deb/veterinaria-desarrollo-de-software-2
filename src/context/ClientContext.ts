import { createContext, type Dispatch, type SetStateAction } from "react";

export interface ClientContextType{
    clientID: string,
    setClientID: Dispatch<SetStateAction<string>>,
}

export const ClientContext = createContext<ClientContextType>({
    clientID: "-1",
    setClientID: () => {}
});