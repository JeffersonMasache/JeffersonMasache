import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialProductsComponent } from './financial-products/financial-products.component';
import { CreateProductComponent } from './financial-products/create-product/create-product.component';
import { UpdateProductComponent } from './financial-products/update-product/update-product.component';

const routes: Routes = [
  { path: 'financial-products', component: FinancialProductsComponent },
  { path: 'financial-products/create-product', component: CreateProductComponent },
  { path: 'financial-products/update-product', component: UpdateProductComponent },
  { path: '', redirectTo: 'financial-products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
