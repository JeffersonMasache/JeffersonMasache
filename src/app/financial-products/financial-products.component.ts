import { Component, OnInit } from '@angular/core';
import { BankService } from '../core/bank.service';
import { FinancialProduct } from '../shared/models/financial-product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'financial-products',
  templateUrl: './financial-products.component.html',
  styleUrls: ['./financial-products.component.scss']
})
export class FinancialProductsComponent implements OnInit {

  financialProducts: FinancialProduct[] = [];
  filtered: FinancialProduct[] = [];
  searchBox: string = '';
  deleteLabel: string = '';
  deleteId: string = '';
  paginationOptions: string[] = ['5', '10', '20'];
  paginationSelected: string = '';
  confirmDelete = false;
  constructor(private services: BankService, private router: Router, private route: ActivatedRoute) { }

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

  addProduct() {
    this.router.navigate(['create-product'], { relativeTo: this.route })
  }

  updateProduct(product: FinancialProduct) {
    this.router.navigate(['update-product'], { relativeTo: this.route, queryParams: { product: JSON.stringify(product) } })
  }

  removeProduct(id: string, name: string) {
    this.confirmDelete = true;
    this.deleteId = id;
    this.deleteLabel = `¿Estás seguro de eliminar el producto ${name}?`;
  }

  async handleConfirm(confirm: boolean) {
    if (confirm) {
      const deleteSuccess = await this.services.deleteProduct(this.deleteId);
      console.log('deleteSuccess', deleteSuccess);
      await this.getFinancialServices();
    }
    this.confirmDelete = false;
  }
}
