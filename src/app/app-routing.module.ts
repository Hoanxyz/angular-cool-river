import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StyleguideComponent } from './styleguide/styleguide.component';
<<<<<<< HEAD
import { NotFoundComponent } from './modules/404/components/notfound/notfound.component';

=======
import { HomeComponent } from './modules/cms/home/home.component';
>>>>>>> aef75b4fb4ec0e7511ff28d2726fd95ad63dba77

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
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
