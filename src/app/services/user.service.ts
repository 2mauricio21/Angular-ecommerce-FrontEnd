import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserLogin, IUserSignUp } from '../models/data-types';
import { Router } from '@angular/router';
import { environment } from 'src/environment';
import { Observable, catchError, map, of } from 'rxjs';

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
        environment.apiKey + `/user?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .pipe(
        map((result) => {
          if (result.ok) {
            if (result.body && result.body.length > 0) {
              localStorage.setItem('user', JSON.stringify(result.body[0]));
              this.router.navigate(['/']);
              return true; // successful
            }
          }
          return false; // failed
        }),
        catchError((error) => {
          console.error('Erro na API de login:', error);
          return of(false); // Retornar false em caso de erro
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
