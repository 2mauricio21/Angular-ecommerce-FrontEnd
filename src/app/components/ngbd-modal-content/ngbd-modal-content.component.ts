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
  priceSumary: IPriceSumary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  @Input() name: any;

  constructor(public activeModal: NgbActiveModal, private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.product.currentCart().subscribe((result) => {
        this.cartData = result;     
        
        let price = 0;
        result.forEach((item) => {
          price = price + +item.price;
        });
        this.priceSumary.price = price;
        this.priceSumary.discount = price / 10;
        this.priceSumary.tax = price / 100;
        this.priceSumary.delivery = 100;
        this.priceSumary.total = price - this.priceSumary.discount + this.priceSumary.tax + this.priceSumary.delivery;
      })
    } else {
      let cartData = localStorage.getItem('localCart');
      if(cartData){
        let cartParse = JSON.parse(cartData);
        this.cartData = cartParse;
        let price = 0;
        if (this.cartData) {
          this.cartData.forEach((item) => {
            price = price + +item.price;
          });
        }
        this.priceSumary.price = price;
        this.priceSumary.discount = price / 10;
        this.priceSumary.tax = price / 100;
        this.priceSumary.delivery = 100;
        this.priceSumary.total = price - this.priceSumary.discount + this.priceSumary.tax + this.priceSumary.delivery;
      }
    }
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
  
}
