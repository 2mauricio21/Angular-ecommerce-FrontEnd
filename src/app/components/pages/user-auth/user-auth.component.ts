import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserLogin, IUserSignUp } from 'src/app/models/data-types';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  constructor(private router: Router, private user: UserService) {}
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
}
