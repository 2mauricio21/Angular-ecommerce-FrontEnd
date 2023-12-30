import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(
    private modalService: NgbModal,
    private route: Router,
    private product: ProductService,
    private authSeller: AuthServiceSeller,
  ) {}
  
  ngOnInit(): void {
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
    this.route.navigate(['/user-auth']);
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
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

@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Carrinho de compra:</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <p>Olá, {{ name }}!</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
    </div>
  `,
})
export class NgbdModalContent {
  @Input() name: any;

  constructor(public activeModal: NgbActiveModal) {}
}
