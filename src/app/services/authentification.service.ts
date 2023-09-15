import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Connexion } from '../models/connexion';


@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private bddURL = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Connexion>{
    const body = {email: email, password : password}
    return this.http.post<Connexion>(this.bddURL + 'login', body)
  }
}
