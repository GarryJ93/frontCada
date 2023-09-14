import { Injectable } from '@angular/core';
import { Messages } from '../models/messages';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: Messages[] = [];

  constructor(private http: HttpClient) {}
  getAllMessages(): Observable<Messages[]> {
    return this.http.get<Messages[]>(`http://localhost:3000/api/messages`);
  }

  getMessagesById(id: number): Observable<Messages> {
    return this.http.get<Messages>(`http://localhost:3000/api/messages/${id}`);
  }

  addMessages(Messages: Messages): Observable<Messages> {
    const headers = new HttpHeaders({
      authorization: `Bearer` + localStorage.getItem('access_token'),
    });
    return this.http.post<Messages>(
      'http://localhost:3000/api/animals',
      Messages,
      { headers: headers }
    );
  }

  deleteMessages(id: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('acces_token'),
    });
    return this.http.delete(`http://localhost:3000/api/messages/${id}`, {
      headers: headers,
    });
  }
}
