import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/data-types';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  popularProducts: undefined | IProduct[];
  trendyProducts: undefined | IProduct[];
  constructor(private product: ProductService) { }
  
  ngOnInit(): void {
    this.product.popularProduct().subscribe((data) => {
      this.popularProducts = data;
    });
    this.product.tredyProducts().subscribe((data) => {
      this.trendyProducts = data;
    });
  }
}
