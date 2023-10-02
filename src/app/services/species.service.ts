import { Injectable } from '@angular/core';
import { Specie } from '../models/species';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  specie: Specie[] = [];

  constructor(private http: HttpClient) {}


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  getBreed(): Observable<Specie[]> {
    return this.http.get<Specie[]>('http://localhost:3000/api/species', { headers: this.getHeaders() });
  }

  getBreedById(id: number): Observable<Specie> {
    return this.http.get<Specie>(`http://localhost:3000/api/species/${id}`, { headers: this.getHeaders() });
  }
}
