import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'customer',
    loadChildren: () => import('./modules/customer/customer.module').then((m) => m.CustomerModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./modules/products/product.module').then((m) => m.ProductModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
