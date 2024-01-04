import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserLogin, IUserSignUp } from '../models/data-types';
import { Router } from '@angular/router';
import { environment } from 'src/environment';
import { EventEmitter } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: IUserSignUp) {
    this.http
      .post(environment.apiKey + '/user', data, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }
  //aqui está tudo certo
  userLogin(data: IUserLogin): Observable<boolean> {
    return this.http
    .get<IUserSignUp[]>(
      environment.apiKey +
        `/user?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).pipe(
      map((result) => {
        if (result && result.body) {
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
          return false; // Login successful
        } else {
          return true; // Login failed
        }
      })
    );
  }
  //aqui está tudo certo
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
