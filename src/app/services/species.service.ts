import { Injectable } from '@angular/core';
import { Specie } from '../models/species';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  specie: Specie[] = [];

  constructor(private http: HttpClient) {}

  getBreed(): Observable<Specie[]> {
    return this.http.get<Specie[]>('http://localhost:3000/api/species');
  }

  getBreedById(id: number): Observable<Specie> {
    return this.http.get<Specie>(`http://localhost:3000/api/species/${id}`);
  }
}
