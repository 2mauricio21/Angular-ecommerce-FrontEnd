import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISellerLogin, ISellerSignUp } from '../models/data-types';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceSeller {
  private currentSellerSubject: BehaviorSubject<any | null>;
  public currentSeller: Observable<any | null>;
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    const sellerData = localStorage.getItem('seller');
    this.currentSellerSubject = new BehaviorSubject<any | null>(
      sellerData ? JSON.parse(sellerData) : null
    );
    this.currentSeller = this.currentSellerSubject.asObservable();
  }
  public get currentSellerValue(): any | null {
    return this.currentSellerSubject.value;
  }
  sellerLogin(data: ISellerLogin) {
    this.http
      .get(
        `${environment.apiKey}/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.currentSellerSubject.next(result.body);
          this.router.navigate(['seller-home']);
        } else {
          console.warn('NÃO FOI POSSÍVEL ACESSAR O SISTEMA');
        }
      });
  }

  sellerLogout() {
    localStorage.removeItem('seller');
    this.currentSellerSubject.next(null);
    this.router.navigate(['/']);
  }

  getSellerId(): number | null {
    const seller = this.currentSellerValue;
    return seller ? seller.id : null;
  }
}
