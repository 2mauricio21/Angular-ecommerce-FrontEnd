import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/data-types';
import { ProductService } from 'src/app/services/product.service';

@Component({
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss'],
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  constructor(private product:ProductService) {}
  submit(data: IProduct) {
    this.product.addProduct(data).subscribe((result) => {
      if(result){
        this.addProductMessage = 'PRODUTO CADASTRADO COM SUCESSO!'
      }
      setTimeout(() => {this.addProductMessage = undefined}, 3000)
    })
  }
}
