import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart, IProduct, IUserLogin, IUserSignUp } from 'src/app/models/data-types';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  constructor(private router: Router, private user: UserService, private product : ProductService) {}
  authError: string | undefined = "";
  showLogin: boolean = false;
  msgErroCadastro: string | undefined;

  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data: IUserSignUp): void {
    if(data.name == '' || data.email == '' || data.password == ''){
      this.msgErroCadastro = 'Preencha todos os campos'
      setTimeout(() => {
        this.msgErroCadastro = undefined;
      }, 3000);
      return
    } else if (!this.isValidEmail(data.email)) {
      this.msgErroCadastro = 'Email inválido';
      setTimeout(() => {
        this.msgErroCadastro = undefined;
      }, 3000);
      return;
    }
    this.user.userSignUp(data);
  }
  login(data: IUserLogin){
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if(result){
        this.authError = "Email ou senha inválidos";
        setTimeout(() => {
          this.authError = "";
        }, 3000);
      } else { 
        this.localCartToRemoveCart()
      }
    })
  }
  openLogin(){
    this.showLogin = true;
  }
  openSignUp(){
    this.showLogin = false;
  }
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  localCartToRemoveCart(){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    let data = localStorage.getItem('localCart');
    if(data){
      let cartDataList: IProduct[] = JSON.parse(data);
      cartDataList.forEach((product : IProduct, index) => {
        let cartData: ICart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result: any) => {
            if (result) {
              console.warn("Produto Salvo com sucess");
            }
          });
        }, 500);
        if(cartDataList.length === index + 1){
          localStorage.removeItem('localCart');
        }
      })
    }
    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);
  }
}
