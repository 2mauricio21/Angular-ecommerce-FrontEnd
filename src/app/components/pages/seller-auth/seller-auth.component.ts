import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../../../services/seller.service';
import { ISellerLogin, ISellerSignUp } from 'src/app/models/data-types';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss'],
})
export class SellerAuthComponent implements OnInit {
  constructor(private sellerService: SellerService, private router: Router) {}
  showLogin: boolean = false;
  msgErroCadastro: string | undefined;

  ngOnInit(): void {
    this.sellerService.reloadSeller()
  }
  signUp(data: ISellerSignUp): void {
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
    this.sellerService.SellerSignUp(data)
  }
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  login(data: ISellerLogin){
    this.sellerService.SellerLogin(data)
  }
  openLogin(){
    this.showLogin = true;
  }
  openSignUp(){
    this.showLogin = false;
  }
}
