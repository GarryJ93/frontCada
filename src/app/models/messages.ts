import { Users } from "./users";

export interface Messages {
    id: number;
    username: string;
    sender: Users;
    receiver: Users;
    message: string;
    date: Date;
}
