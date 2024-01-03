import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {CmsModule} from "./modules/cms/cms.module";
import {CustomerModule} from "./modules/customer/customer.module";
import { NotFoundComponent } from './modules/404/components/notfound/notfound.component';
import { IgxCarouselModule, IgxListModule } from 'igniteui-angular';
import { HammerModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    CmsModule,
    CustomerModule,
    IgxCarouselModule,
    IgxListModule,
    HammerModule,
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
