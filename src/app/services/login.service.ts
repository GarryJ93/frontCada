import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Connexion } from 'src/app/models/connexion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private bddURL = 'http://localhost:3000/api/auth';

  isConnected: boolean = false;

  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<Connexion> {
    const body = { username: username, password: password };
    // console.log('le body', body);
    // console.log('le bddurl', this.bddURL);
    // console.log(
    //   'le post',
    //   (this.bddURL + '/login')
    // );
    return this.http.post<Connexion>(this.bddURL + '/login', body);
  }

  checkConnexion(): boolean{
    this.isConnected = !!localStorage.getItem('access_token');
    return this.isConnected;
  }
}
