import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StyleguideComponent } from './styleguide/styleguide.component';
import { NotFoundComponent } from './modules/404/components/notfound/notfound.component';
import { HomeComponent } from './modules/cms/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'styleguide', component: StyleguideComponent },
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
