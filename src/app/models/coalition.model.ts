import { PartyValue } from "./partyvalue.model";

export interface Coalition {
    id: string;
    seats: number;
    values: Array<PartyValue>;
}