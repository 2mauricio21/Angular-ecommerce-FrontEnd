import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/data-types';
import { ProductService } from 'src/app/services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | IProduct[];
  productMessage: undefined | string;
  icon = faTrash;
  editIcon = faEdit;
  constructor(
    private product: ProductService
  ) {}
  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Produto Deletado com sucesso!';
        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
  list() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }
}
