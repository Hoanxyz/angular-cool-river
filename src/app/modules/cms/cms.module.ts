import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {RouterLink} from "@angular/router";
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NewsletterComponent,
    SearchComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule
  ]
})
export class CmsModule { }
