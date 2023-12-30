import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISellerLogin, ISellerSignUp } from '../models/data-types';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthServiceSeller } from './auth-seller.service';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router, private authSeller: AuthServiceSeller) {}

  SellerSignUp(data: ISellerSignUp) {
    this.http
      .post(environment.apiKey + '/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      });
  }
  SellerLogin(data: ISellerLogin) {
    this.authSeller.sellerLogin(data);
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
}
