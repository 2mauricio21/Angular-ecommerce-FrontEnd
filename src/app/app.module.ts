import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { SellerAuthComponent } from './components/pages/seller-auth/seller-auth.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SellerHomeComponent } from './components/pages/seller-home/seller-home.component';
import { SellerAddProductComponent } from './components/pages/seller-add-product/seller-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerUpdateProductComponent } from './components/pages/seller-update-product/seller-update-product.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/pages/search/search.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { UserAuthComponent } from './components/pages/user-auth/user-auth.component';
import { NgbdModalContentComponent } from './components/ngbd-modal-content/ngbd-modal-content.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { MyOrdersComponent } from './components/pages/my-orders/my-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SellerAuthComponent,
    HomeComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    FooterComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    NgbdModalContentComponent,
    CheckoutComponent,
    MyOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
