import { Injectable } from '@angular/core';
import { Messages } from '../models/messages';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  // messages: Messages[] = [];

  // constructor(private http: HttpClient) {}
  // getAllMessages(): Observable<Messages[]> {
  //   return this.http.get<Messages[]>(`http://localhost:3000/api/messages`);
  // }

  // getMessagesById(id: number): Observable<Messages> {
  //   return this.http.get<Messages>(`http://localhost:3000/api/messages/${id}`);
  // }

  // addMessages(Messages: Messages): Observable<Messages> {
  //   const headers = new HttpHeaders({
  //     authorization: `Bearer` + localStorage.getItem('access_token'),
  //   });
  //   return this.http.post<Messages>(
  //     'http://localhost:3000/api/animals',
  //     Messages,
  //     { headers: headers }
  //   );
  // }

  // deleteMessages(id: number) {
  //   const headers = new HttpHeaders({
  //     Authorization: 'Bearer' + localStorage.getItem('acces_token'),
  //   });
  //   return this.http.delete(`http://localhost:3000/api/messages/${id}`, {
  //     headers: headers,
  //   });
  // }


  private lastMessageId = 0;
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  sendMessage(content: string, senderId: number, receiverId: number) {
    const headers = this.getHeaders();
    const body = { content, senderId, receiverId };
    return this.http.post<Messages>(`${this.BASE_URL}/messages`, body, { headers });
  }

  getMessagesBetweenUsers(user1Id: number, user2Id: number) {
    const headers = this.getHeaders();
    return this.http.get<Messages[]>(`${this.BASE_URL}/messages/conversation/${user1Id}/${user2Id}`, { headers });
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
