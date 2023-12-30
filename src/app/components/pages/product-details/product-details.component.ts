import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/data-types';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | IProduct;
  productQuantity: number = 1;
  quantity:number = 1;

  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((data) => {
      this.productData = data;
    })
  };
  handleQuntity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity+=1;
    } else if(this.productQuantity > 1 && val === 'min'){
      this.productQuantity--;
    }
    
  }
}
