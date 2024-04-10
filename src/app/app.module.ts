import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FinancialProductsComponent } from './financial-products/financial-products.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeadersInterceptor } from './core/headers.interceptor';
import { CreateProductComponent } from './financial-products/create-product/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEsEC from '@angular/common/locales/es-EC';
import { UpdateProductComponent } from './financial-products/update-product/update-product.component';
registerLocaleData(localeEsEC);
@NgModule({
  declarations: [
    AppComponent,
    FinancialProductsComponent,
    CreateProductComponent,
    UpdateProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true }, { provide: LOCALE_ID, useValue: 'es-EC' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
