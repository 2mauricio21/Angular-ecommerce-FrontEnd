import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICart, IProduct, IUserLogin, IUserSignUp } from 'src/app/models/data-types';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit, OnDestroy {
  constructor(private user: UserService, private product : ProductService) {}
  private userLoginSubscription: Subscription | undefined;
  authError: string | undefined = "";
  showLogin: boolean = true;
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
  login(data: IUserLogin) {
    // Crie a assinatura da Observable e armazene-a na propriedade
    this.userLoginSubscription = this.user.userLogin(data).subscribe({
      next: (success) => {
        if (success) {
          this.localCartToRemoveCart(); // Execute ações após login bem-sucedido
        } else {
          this.authError = "Email ou senha inválidos";
          setTimeout(() => {
            this.authError = "";
          }, 3000);
        }
      },
      error: (error) => {
        console.error('Erro no login:', error);
        this.authError = 'Erro ao tentar fazer login.';
      }
    });
  }

  ngOnDestroy() {
    // Cancele a assinatura da Observable se ela existir
    if (this.userLoginSubscription) {
      this.userLoginSubscription.unsubscribe();
    }
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
    let data = localStorage.getItem('localCart');
    let user  = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    console.log(userId);
    console.log(userId);
    console.log(userId);
    
    if(data){
      let cartDataList : [] = JSON.parse(data);
      console.log(cartDataList);      

      cartDataList.forEach((product : IProduct, index) => {
        let cartData: ICart = { 
          ...product,
          productId: product.id,
          userId: userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("Dados Salvo com sucess");
            }
          })
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
