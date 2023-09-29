import { Injectable } from '@angular/core';
import { Animals } from '../models/animals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  animals: Animals[] = [];

  constructor(private http: HttpClient) {}

  getAllAnimals(): Observable<Animals[]> {
    return this.http.get<Animals[]>('http://localhost:3000/api/animals');
  }

  getAnimalById(id: number): Observable<Animals> {
    return this.http.get<Animals>(`http://localhost:3000/api/animals/${id}`);
  }

  // getAnimalByUserId(): Observable<Animals> {
  //   return this.http.get<Animals>(`http://localhost:3000/api/animals/animal`);
  // }
  addAnimals(Animals: Animals): Observable<Animals> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.post<Animals>(
      'http://localhost:3000/api/animals',
      Animals,
      { headers: headers },
    );
  }

  modifyAnimals(id: number, updateData: Animals): Observable<Animals> {
    // const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }), { headers: headers }
    return this.http.patch<Animals>(
      `http://localhost:3000/api/animals/${id}`,
      updateData,
    );
  }

  deleteAnimals(id: number) {
    // console.log('ok pour le service')
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.delete(`http://localhost:3000/api/animals/${id}`, {
      headers: headers,
    });
  }

    getAnimalByUserId(id: number): Observable<Animals> {
        return this.http.get<Animals>(`http://localhost:3000/api/animals/user/${id}`);
  }
}
