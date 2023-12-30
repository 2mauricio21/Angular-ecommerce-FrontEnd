import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserLogin, IUserSignUp } from '../models/data-types';
import { Router } from '@angular/router';
import { environment } from 'src/environment';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>();
  constructor(private http: HttpClient,private router: Router) { }

  userSignUp(data: IUserSignUp){
    this.http
      .post(environment.apiKey + '/user', data, { observe: 'response' })
      .subscribe((result) => {
        if(result){
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }
  userLogin(data: IUserLogin){
    this.http.get<IUserSignUp[]>(environment.apiKey + `/user?email=${data.email}&password=${data.password}`,{ observe: 'response' })
    .subscribe((result) => {
      if (result && result.body?.length){
        this.invalidUserAuth.emit(false);
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      } else {
        this.invalidUserAuth.emit(true);
      }
    });
  }
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
