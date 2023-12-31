import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: Users[] = [];

  constructor(private http: HttpClient) {}
  
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>('http://localhost:3000/api/users', {headers: this.getHeaders()});
  }

  getUserById(id: number): Observable<Users> {
    return this.http.get<Users>(`http://localhost:3000/api/users/${id}`, { headers: this.getHeaders() });
  }

  login(username: string, password: string) {
    return this.http
      .post<{ access_token: string; user_id: string; username:string }>(
        'http://localhost:3000/api/auth/login',
        { username, password }
      )
      .pipe(
        tap((response) => {
          console.log(
            'REGARDE CA POUR VOIR COMMENT TU RECOIS ID DE LA PERS CONNECTER',
            response.user_id
          );

          localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('username', response.username);

          if (response.user_id && Number.isFinite(response.user_id)) {
            localStorage.setItem('user_id', response.user_id);
            
            console.log(
              'Id utilisateur stocké:',
              localStorage.getItem('user_id')
            );
          }
        })
      );
  }

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(
      'http://localhost:3000/api/auth/register',
      user
    );
  }

  modifyUsers(id: number, updateData: Partial<Users>): Observable<Partial<Users>> {
    // const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }), { headers: headers }
    // enlever la propriété animals de l'objet updateData
    delete updateData.animal;
    console.log("mon teste", updateData);
    return this.http.patch<Users>(
      `http://localhost:3000/api/users/${id}`,
      updateData, { headers: this.getHeaders() }
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
