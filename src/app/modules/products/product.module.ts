import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { ProductComponent } from './components/product/product.component';
import { NotFoundComponent } from '../404/components/notfound/notfound.component';
import { IgxCarouselModule } from 'igniteui-angular';

const routes: Routes = [
    {
        path: ':sku',
        component: ProductComponent
    },
    {
      path: '**',
      component: NotFoundComponent
    }
];
  
@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
    IgxCarouselModule
  ]
})
export class ProductModule { }
