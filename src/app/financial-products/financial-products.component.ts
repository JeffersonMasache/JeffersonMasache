import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import { FinancialProduct } from '../shared/models/financial-product';

@Component({
  selector: 'financial-products',
  templateUrl: './financial-products.component.html',
  styleUrls: ['./financial-products.component.scss']
})
export class FinancialProductsComponent implements OnInit {

  financialProducts: FinancialProduct[] = [];
  filtered: FinancialProduct[] = [];
  searchBox: string = '';
  paginationOptions: string[] = ['5', '10', '20'];
  paginationSelected: string = '';
  constructor(private services: BankService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    await this.getFinancialServices();
    this.paginationSelected = this.paginationOptions[0];
    this.pagination();
  }

  async getFinancialServices() {
    this.financialProducts = await this.services.getFinancialServices();
    this.filtered = [...this.financialProducts];
  }

  changeSearchBox(event: any) {
    let value = event.target.value;
    this.filtered = [...this.financialProducts.filter(product => {
      return product.name.includes(value) || product.description.includes(value)
        || product.date_release.toString().includes(value) || product.date_revision.toString().includes(value);
    })];
  }

  onPaginationChange(event: any) {
    this.paginationSelected = event.target.value;
    this.pagination();
  }

  pagination() {
    this.filtered = [... this.financialProducts.slice(0, parseInt(this.paginationSelected))];
  }

  async addFinancialProduct() {
    let product: FinancialProduct = {
      id: 'rcmp',
      name: 'Recompensas',
      description: 'Programa de recompensas',
      logo: 'https://previews.123rf.com/images/sdecoret/sdecoret1706/sdecoret170600382/79419792-hombre-de-negocios-en-el-fondo-borroso-recibiendo-e-mails-en-sus-dispositivos-digitales.jpg',
      date_release: new Date(),
      date_revision: new Date()
    };
    var productCreated = await this.services.addFinancialService(product);
    await this.getFinancialServices();
    console.log('productCreated', productCreated);
  }
}
