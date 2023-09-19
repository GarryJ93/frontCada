import { Animals } from "./animals"
import { Photos } from "./photos";

export interface Users {
    id_user: number;
    username: string;
    firstname: string;
    description: string;
    email: string;
    city: string;
    password: string;
    departement: number;
    id_photo: number;
    id_gender_user: number;
    animal: Animals[];
    photo: Photos
}