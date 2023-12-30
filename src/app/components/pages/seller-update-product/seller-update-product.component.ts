import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/data-types';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss'],
})
export class SellerUpdateProductComponent implements OnInit {
  productMessage: undefined | string;
  productData: undefined | IProduct;

  constructor(private route: ActivatedRoute, private product: ProductService) {}
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        this.productData = data;
      });
  }
  submit(data: IProduct) {
    if(this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Produto atualizado com sucesso!';
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
