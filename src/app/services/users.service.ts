import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: Users[] = [];

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>('http://localhost:3000/api/users');
  }

  getUserById(id: number): Observable<Users> {
    return this.http.get<Users>(`http://localhost:3000/api/users/${id}`);
  }

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>('http://localhost:3000/api/auth/register', user);
  }

  modifyUsers(id: number, updateData: Users): Observable<Users> {
    // const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }), { headers: headers }
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

  getUserConnected(): number {
    const userId = localStorage.getItem('user_id');

    if (userId !== null) {
      const parsedId = parseInt(userId, 10);

      if (!isNaN(parsedId)) {
        return parsedId;
      } else {
        console.error('Stored user_id is not a valid number:', userId);
      }
    } else {
      console.error('No user_id found in local storage.');
    }

    return 0;
  }
}
