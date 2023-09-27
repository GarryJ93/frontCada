import { Injectable } from '@angular/core';
import { Messages } from '../models/messages';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  
  private lastMessageId = 0;
  private BASE_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  sendMessage(message: string, senderId: number, receiverId: number) {
    const headers = this.getHeaders();
    const body = { message, senderId, receiverId };
    return this.http.post<Messages>(`${this.BASE_URL}/messages`, body, { headers });
  }

  getUserChats(senderId: number, receiverId: number): Observable<Messages[]> {
    const headers = this.getHeaders();
    return this.http.get<Messages[]>(`${this.BASE_URL}/messages/conversation/${senderId}/${receiverId}`, { headers }).pipe(
      tap((messages: Messages[]) => {
        this.lastMessageId = messages[messages.length - 1].id
        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj', this.lastMessageId);

      })
    );
  }
}
