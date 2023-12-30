import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/pages/home/home.component';
import { SellerAuthComponent } from './components/pages/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './components/pages/seller-home/seller-home.component';
import { SellerAddProductComponent } from './components/pages/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './components/pages/seller-update-product/seller-update-product.component';
import { SearchComponent } from './components/pages/search/search.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { UserAuthComponent } from './components/pages/user-auth/user-auth.component';

const routes: Routes = [
  { 
    component: HomeComponent ,
    path: '',
  },
  { 
    component: SellerAuthComponent,
    path: 'seller-auth',
  },
  { 
    component: SellerHomeComponent,
    path: 'seller-home', 
    canActivate: [AuthGuard]
  },
  {
    component: SellerAddProductComponent,
    path: 'seller-add-product',
    canActivate: [AuthGuard]
  },
  {
    component: SellerUpdateProductComponent,
    path: 'seller-update-product/:id',
    canActivate: [AuthGuard]
  },
  {
    component: SearchComponent,
    path: 'search/:query',
  },
  {
    component: ProductDetailsComponent,
    path: 'details/:productId',
  },
  {
    component: UserAuthComponent,
    path: 'user-auth',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
