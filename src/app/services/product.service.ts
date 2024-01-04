import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ICart, IOrder, IProduct } from '../models/data-types';
import { AuthServiceSeller } from './auth-seller.service';
import { environment } from 'src/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<IProduct[] | []>()
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
  localAddToCart(data: IProduct) {
    let cartData: IProduct[] = [] 
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);      
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);    
    }
  }
  addToCart(cartData: ICart){    
    return this.http.post(environment.apiKey + '/cart', cartData);
  }
  removeItemFromCart(productId: number){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items : IProduct[] = JSON.parse(cartData);
      items = items.filter((item: IProduct) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  removeToCart(cartId: number){
    return this.http.delete(environment.apiKey + `/cart/${cartId}`);

  }
  getCartList(userId: number){
    return this.http
      .get<IProduct[]>(environment.apiKey + `/cart?userId=${userId}`, {
        observe: 'response',
      }).subscribe((result) => {
        if(result && result.body){ 
          this.cartData.emit(result.body);
        }
    })
  }
  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    if (userData && userData.id) {
      return this.http.get<ICart[]>(`${environment.apiKey}/cart?userId=${userData.id}`);
    } else {
      return of([]); // Retorna um Observable vazio se não houver usuário logado
    }
  }

  orderNow(data: IOrder){
    return this.http.post(environment.apiKey + '/orders', data);
  }
  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<IOrder[]>(environment.apiKey + `/orders?userId=`+ userData.id);
  }
  deleteCartItems(cartId:number){
    return this.http.delete(environment.apiKey + '/cart/'+cartId, {observe: 'response'}). subscribe((result) => {
      if(result){
        this.cartData.emit([])
      }
    })
  }
  cancelOrder(orderId: number){
    return this.http.delete(environment.apiKey + `/orders/${orderId}`);

  }
}
