import { Injectable } from '@angular/core';
import { SexAnimals } from '../models/sex-animals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SexAnimalsService {
  sex_animal: SexAnimals[] = [];
  constructor(private http: HttpClient) {}


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }


  getAllSexAnimals(): Observable<SexAnimals[]> {
    return this.http.get<SexAnimals[]>('http://localhost:3000/api/sex-animals', { headers: this.getHeaders() });
  }

  getSexAnimalById(id: number): Observable<SexAnimals> {
    return this.http.get<SexAnimals>(
      `http://localhost:3000/api/sex-animals/${id}`, { headers: this.getHeaders() }
    );
  }
}
