import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/data-types';
import { AuthServiceSeller } from './auth-seller.service';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private authService: AuthServiceSeller) {}

  addProduct(data: IProduct) {
    return this.http.post(environment.apiKey + '/product', data);
  }
  productList() {
    return this.http.get<IProduct[]>(environment.apiKey + '/product');
  }
  deleteProduct(id: number) {
    return this.http.delete<IProduct[]>(environment.apiKey + `/product/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<IProduct>(environment.apiKey + `/product/${id}`);
  }
  updateProduct(data: IProduct) {
    return this.http.put<IProduct[]>(
      environment.apiKey + `/product/${data.id}`,
      data
    );
  }
  popularProduct() {
    return this.http.get<IProduct[]>(environment.apiKey + `/product?_limit=3`);
  }
  tredyProducts() {
    return this.http.get<IProduct[]>(environment.apiKey + `/product?_limit=8`);
  }
  searchProduct(query: string) {
    return this.http.get<IProduct[]>(
      environment.apiKey + `/product?q=${query}`
    );
  }
}
