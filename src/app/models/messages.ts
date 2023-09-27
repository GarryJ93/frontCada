import { Users } from "./users";

export interface Messages {
    id: number;
    username: string;
    sender_id: Users;
    receiver_id: Users;
    content: string;
    timestamp: Date;
}
