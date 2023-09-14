import { Injectable } from '@angular/core';
import { SexAnimals } from '../models/sex-animals';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SexAnimalsService {
  sex_animal: SexAnimals[] = [];
  constructor(private http: HttpClient) {}

  getAllsexAnimals(): Observable<SexAnimals[]> {
    return this.http.get<SexAnimals[]>('http://localhost:3000/api/sex_animals');
  }

  getsexAnimalById(id: number): Observable<SexAnimals> {
    return this.http.get<SexAnimals>(
      `http://localhost:3000/api/sex_animals/${id}`,
    );
  }
}
