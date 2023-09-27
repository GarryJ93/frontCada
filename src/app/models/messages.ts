import { Users } from "./users";

export interface Messages {
    id_message: number;
    username: string;
    sender: Users;
    receiver: Users;
    message: string;
    date: Date;
}
