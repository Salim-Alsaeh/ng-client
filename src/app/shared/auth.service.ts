import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user;

  constructor(private http: HttpClient) { }

  public register(userData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/`, userData);
  }

  public login(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(`${environment.apiUrl}/user/login`, userData).pipe(
      map((res: any) => {
        this.user = res.user;
        return this.saveTokenAndCurrentUser(res.token);
      })
    );
  }

  private saveTokenAndCurrentUser(token: string): string {
     localStorage.setItem('token', token);
     localStorage.setItem('currentUser', JSON.stringify(this.user));
     return token;
  }
}
