import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BankService } from 'src/app/core/bank.service';
import { FinancialProduct } from 'src/app/shared/models/financial-product';


@Component({
  selector: 'update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  now!: Date;
  nowString = '';
  form!: FormGroup;
  model: FinancialProduct = {
    id: '',
    name: '',
    logo: '',
    description: '',
    date_release: new Date(),
    date_revision: new Date()
  };
  product!: FinancialProduct;

  constructor(private _formBuilder: FormBuilder, private services: BankService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.product = JSON.parse(params['product']);
    });
    this.now = new Date();
    let date_release = this.product.date_release.toLocaleString().split('T')[0];
    let date_revision = this.product.date_revision.toLocaleString().split('T')[0];
    this.nowString = `${this.now.getFullYear}-${this.now.getMonth}-${this.now.getDate}`;
    this.form = this._formBuilder.group({
      id: [this.product.id, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: [this.product.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: [this.product.description, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: [this.product.logo, [Validators.required]],
      date_release: [date_release, [Validators.required, this.validateDateRelease.bind(this)]],
      date_revision: [date_revision, [Validators.required]],
    });
    this.form.updateValueAndValidity();
    this.form.get('date_release')?.valueChanges.subscribe((value) => {
      var dateValue = new Date(value);
      dateValue.setFullYear(dateValue.getFullYear() + 1);
      const date = dateValue.toISOString().split('T')[0];
      this.form.get('date_revision')?.setValue(date);
      this.form.get('date_revision')?.updateValueAndValidity();
    });
  }

  async updateProduct() {
    this.model = this.form.value;
    let productCreated: FinancialProduct = await this.services.updateFinancialService(this.model);
    console.log('productCreated', productCreated);
  }

  validateDateRelease(control: AbstractControl): { [key: string]: any } | null {
    this.now.setHours(0, 0, 0, 0);
    const value = new Date(control.value + ' 00:00:00');
    if (value < this.now)
      return { 'limitDate': { value: control.value } };
    return null;
  }

  clearFields() {
    this.form.get('name')?.setValue('');
    this.form.get('logo')?.setValue('');
    this.form.get('description')?.setValue('');
    this.form.get('date_release')?.setValue('');
    this.form.get('date_revision')?.setValue('');
    this.form.updateValueAndValidity();
  }
}
