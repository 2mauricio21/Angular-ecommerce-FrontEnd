import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContentComponent } from '../ngbd-modal-content/ngbd-modal-content.component';
import { IProduct } from 'src/app/models/data-types';
import { AuthServiceSeller } from 'src/app/services/auth-seller.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | IProduct[];
  userName: string = '';
  cartItens = 0;
  constructor(
    private modalService: NgbModal,
    private route: Router,
    private product: ProductService,
    private authSeller: AuthServiceSeller,
  ) {}
  
  ngOnInit(): void {
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItens = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((item) => {
      this.cartItens = item.length;
    })
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.nome;
          }
        } else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.nome;       
          this.menuType = 'user';
          this.product.getCartList(userData.id);
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  logout() {
    this.authSeller.sellerLogout();
    this.menuType = 'default';
  }
  userLogout(){
    localStorage.removeItem('user');
    this.menuType = 'default';
    this.userName = '';
    this.product.cartData.emit([]);
    this.route.navigate(['/user-auth']);
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.name = `${this.userName || ''}`;
  }

  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        if(result.length > 5){
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }
  hideSearch(){
    this.searchResult = undefined;
  }
  submitSearch(query: string){
    this.route.navigate([`/search/${query}`]);
  }
  redirectToDetails(productId: number){
    this.route.navigate([`/details/${productId}`]);
  }
}
