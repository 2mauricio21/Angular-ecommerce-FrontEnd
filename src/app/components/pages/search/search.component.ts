import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/data-types';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }

  searchResult: undefined | IProduct[];

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.product.searchProduct(query).subscribe((result) => {
      this.searchResult = result;
    });
  }


}
