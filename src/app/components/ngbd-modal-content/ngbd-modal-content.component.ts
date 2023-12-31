import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICart, IPriceSumary } from 'src/app/models/data-types';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './ngbd-modal-content.component.html',
  /* standalone: true, */
  styleUrls: ['./ngbd-modal-content.component.scss']
})
export class NgbdModalContentComponent implements OnInit {
  cartData: ICart[] | undefined;
  priceSummary: IPriceSumary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 100,
    total: 0
  }
  @Input() name: any;

  constructor(public activeModal: NgbActiveModal, private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadDetails();
  }
  navigateToProductDetail(productId: number) {
    if (productId !== undefined) {
      this.router.navigate(['/details', productId]);
      this.activeModal.close();
    } else {
      // Exibir mensagem ao usuário
      alert('O produto não está disponível no momento.');
    }
  }
  navigateCheckout() {
    if(!localStorage.getItem('user')){
      this.router.navigate(['/user-auth']);
      return;
    }
    this.router.navigate(['/checkout']);
  }
  removeToCart(cartId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(cartId);
    } else  {
      cartId && this.cartData && this.product.removeToCart(cartId).subscribe((result) => {
        if(result){
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
        }
      })
    }
    this.loadDetails()    
  }

  loadDetails(): void {
    if (!localStorage.getItem('user')) {
      this.loadDetailsFromLocalStorage();
    } else {
      this.loadDetailsFromService();
    }
  }
  loadDetailsFromService(): void {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      this.calculatePriceSummary();
    });
  }

  loadDetailsFromLocalStorage(): void {
    const localCart = localStorage.getItem('localCart');
    if (localCart) {
      this.cartData = JSON.parse(localCart);
      this.calculatePriceSummary();

      if (this.cartData && !this.cartData.length) {
        this.activeModal.close();
      }
    } else {
      this.activeModal.close();
    }
  }
  calculatePriceSummary(): void {
    let price = 0;
    if (this.cartData) {
      this.cartData.forEach((item) => {
        price += +item.price;
      });
    }
    this.priceSummary.price = price;
    this.priceSummary.discount = price / 10;
    this.priceSummary.tax = price / 100;
    this.priceSummary.total = price - this.priceSummary.discount + this.priceSummary.tax + this.priceSummary.delivery;
  }
}
