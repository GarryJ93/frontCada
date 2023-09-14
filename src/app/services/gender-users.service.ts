import { Injectable } from '@angular/core';
import { GenderUser } from '../models/gender-users';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderUserService {
  gender: GenderUser[] = [];

  constructor(private http: HttpClient) { }

  getGenderUsers(): Observable<GenderUser[]>{
    return this.http.get<GenderUser[]>('http://localhost:3000/api/gender-users')
  }

  
getGenderUserById(id: number): Observable<GenderUser> {
  return this.http.get<GenderUser>(`http://localhost:3000/api/gender-users/${id}`)
}
}