import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StyleguideComponent } from './styleguide/styleguide.component';
import { HomeComponent } from './modules/cms/home/home.component';
import { CartComponent } from './modules/cart/components/cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'styleguide', component: StyleguideComponent },
  {
    path: 'customer',
    loadChildren: () => import('./modules/customer/customer.module').then((m) => m.CustomerModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./modules/cart/cart-routing.module').then((m) => m.CartRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
