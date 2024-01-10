import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MiniCartComponent } from './mini-cart/mini-cart.component';
import { PriceFormatPipe } from '../shared/pipe/price-format.pipe';
@NgModule({
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  declarations: [
    CartComponent,
    MiniCartComponent,
    PriceFormatPipe
  ],
  providers: [
    MatSnackBar
  ],
  exports: [
    MiniCartComponent
  ],
})
export class CartModule { }
