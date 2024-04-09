import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import { FinancialProduct } from '../shared/models/financial-product';

@Component({
  selector: 'financial-products',
  templateUrl: './financial-products.component.html',
  styleUrls: ['./financial-products.component.scss']
})
export class FinancialProductsComponent implements OnInit {

  financialProducts: any = [];
  constructor(private services: BankService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.financialProducts = await this.services.getFinancialServices();
    console.log('financialProducts', this.financialProducts);
  }

}
