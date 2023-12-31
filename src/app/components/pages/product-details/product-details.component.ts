import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICart, IProduct } from 'src/app/models/data-types';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | IProduct;
  productQuantity: number = 1;
  quantity: number = 1;
  removeCart = false;
  cartData: IProduct | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.productData = result;
        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let cartDataParse = JSON.parse(cartData);
          cartDataParse = cartDataParse.filter(
            (item: IProduct) => productId === item.id.toString()
          );
          if (cartDataParse.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
      });
    let user = localStorage.getItem('user');
    if (user) {
      let userId = user && JSON.parse(user).id;
      this.product.getCartList(userId);
      this.product.cartData.subscribe((result) => {
        let item = result.filter(
          (item: IProduct) =>
            productId?.toString() === item.productId?.toString()
        );
        if (item.length) {
          this.cartData = item[0];
          this.removeCart = true;
        }
      });
    }
  }
  handleQuntity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity--;
    }
  }
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: ICart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;

        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
      this.removeCart = false;
    } else {
      this.cartData &&
        this.product.removeToCart(this.cartData.id).subscribe((result) => {
          if (result) {
            let user = localStorage.getItem('user');
            let userId = user && JSON.parse(user).id;
            this.product.getCartList(userId);
          }
        });
      this.removeCart = false;
    }
  }
  navigateCheckout(){
    if(!localStorage.getItem('user')){
      this.router.navigate(['/user-auth']);
      return;
    }
    this.router.navigate(['/checkout']);
  }
}
