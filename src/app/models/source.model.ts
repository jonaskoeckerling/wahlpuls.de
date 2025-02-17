import { PollResult } from "./pollresult.model";

export interface Source {
    name: string;
    pollResults: PollResult[];
}