import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StyleguideComponent } from './styleguide/styleguide.component';


const routes: Routes = [
  { path: 'styleguide', component: StyleguideComponent },
  {
    path: 'customer',
    loadChildren: () => import('./modules/customer/customer.module').then((m) => m.CustomerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
