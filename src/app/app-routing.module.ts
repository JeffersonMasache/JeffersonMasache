import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialProductsComponent } from './financial-products/financial-products.component';

const routes: Routes = [
  { path: 'financial-products', component: FinancialProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
