import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Breed } from '../models/breed';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreedService {
  breed: Breed[] = [];

  constructor(private http: HttpClient) {}

  getBreed(): Observable<Breed[]> {
    return this.http.get<Breed[]>('http://localhost:3000/api/breed');
  }

  getBreedById(id: number): Observable<Breed> {
    return this.http.get<Breed>(`http://localhost:3000/api/breed/${id}`);
  }

  addBreed(breed: Breed): Observable<Breed> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.post<Breed>('http://localhost:3000/api/breed', breed, {
      headers: headers,
    });
  }

  deleteBreed(id: number): Observable<Breed> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.delete<Breed>(`http://localhost:3000/api/breed/${id}`, {
      headers: headers,
    });
  }
}
