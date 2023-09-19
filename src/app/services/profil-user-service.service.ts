import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilUserServiceService {
  users:Users[] = [];


  constructor(private http:HttpClient) { }

  getUserById(id: number): Observable<Users> {
    return this.http.get<Users>(`http://localhost:3000/api/users/${id}`);
  }


  modifyUsers(id: number, updateData: Users): Observable<Users> {
    return this.http.patch<Users>(
      `http://localhost:3000/api/users/${id}`,
      updateData
    );
  }

  deleteUsers(id: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.delete(`http://localhost:3000/api/users/${id}`, {
      headers: headers,
    });
  }



}
