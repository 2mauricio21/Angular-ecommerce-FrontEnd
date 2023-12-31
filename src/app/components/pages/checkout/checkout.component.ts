import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart, IOrder } from 'src/app/models/data-types';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartData: ICart[] | undefined;
  totalPrice: number | undefined;
  orderMsg: string | undefined;
  constructor(private product: ProductService, private router: Router) { }
  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result
      result.forEach((item: any) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      });
      this.totalPrice = price + (price / 100) + 100 - (price / 10)
    })
  }
  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData: IOrder = {
        ...data,
        totalprice: this.totalPrice,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id)
        }, 600);
      })
      this.product.orderNow(orderData).subscribe((result) => {
        if(result){
          this.orderMsg = "Seu pedido foi realizado com sucesso"
          setTimeout(() => {
            this.router.navigate(['/my-orders'])
            this.orderMsg = undefined;
          }, 3000);
        }
      })
    }
  }
  removeToCart(){}
}
