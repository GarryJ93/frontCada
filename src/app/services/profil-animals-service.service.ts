import { Injectable } from '@angular/core';
import { Animals } from '../models/animals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilAnimalsServiceService {
  animal: Animals[] = [];

  constructor(private http: HttpClient) { }

  getAnimalById(id:number):Observable<Animals>{
    return this.http.get<Animals>(`http://localhost:3000/api/animals/${id}`)
  }

  addAnimal(animal: Animals): Observable<Animals> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') })
    return this.http.post<Animals>('http://localhost:3000/api/animals', animal, {headers: headers});
  }

  updateAnimal(id: number, animal: Animals): Observable<Animals> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') })
    return this.http.put<Animals>(`http://localhost:3000/api/animals/${id}`, animal, {headers: headers});
  }

  deleteAnimal(id: number) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') })
    return this.http.delete(`http://localhost:3000/api/animals/${id}`, {headers: headers});
  }


}
