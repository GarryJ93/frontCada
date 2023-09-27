import { Breed } from "./breed";
import { Photos } from "./photos";
import { SexAnimals } from "./sex-animals";

export interface Animals {
  id_animals: number;
  name: string;
  age: number;
  id_user: number;
  id_breed: number;
  id_photo: number;
  id_sex_animal:number;
  breed: Breed;
  photo: Photos;
  sexAnimal: SexAnimals;
  // propriété utilisée que sur le front
  picture: any;
}
