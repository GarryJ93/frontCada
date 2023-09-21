import { Specie } from "./species";

export interface Breed {
    id_breed: number;
    breed: string;
    id_species: number;
    species: Specie;
}