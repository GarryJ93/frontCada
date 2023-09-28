import { Users } from "./users";

export interface Messages {
    id_message: number;
    username: string;
    sender: Partial<Users>;
    receiver: Partial<Users>;
    message: string;
    date: Date;
}
