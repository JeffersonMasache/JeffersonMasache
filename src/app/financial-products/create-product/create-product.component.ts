import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankService } from 'src/app/core/bank.service';
import { FinancialProduct } from 'src/app/shared/models/financial-product';


@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

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

  constructor(private _formBuilder: FormBuilder, private services: BankService) { }

  ngOnInit(): void {
    this.now = new Date();
    this.nowString = `${this.now.getFullYear}-${this.now.getMonth}-${this.now.getDate}`;
    this.form = this._formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [this.validateId.bind(this)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required, this.validateDateRelease.bind(this)]],
      date_revision: ['', [Validators.required]],
    });

    this.form.get('date_release')?.valueChanges.subscribe((value) => {
      var dateValue = new Date(value);
      dateValue.setFullYear(dateValue.getFullYear() + 1);
      const date = dateValue.toISOString().split('T')[0];
      this.form.get('date_revision')?.setValue(date);
      this.form.get('date_revision')?.updateValueAndValidity();
    });
  }

  async addProduct() {
    this.model = this.form.value;
    let productCreated: FinancialProduct = await this.services.addFinancialService(this.model);
    if (!!productCreated)
      this.clearFields();
  }

  validateDateRelease(control: AbstractControl): { [key: string]: any } | null {
    this.now.setHours(0, 0, 0, 0);
    const value = new Date(control.value + ' 00:00:00');
    if (value < this.now)
      return { 'limitDate': { value: control.value } };
    return null;
  }

  async validateId(control: AbstractControl) {
    var verification = await this.services.verificateProduct(control.value);
    if (verification)
      return { 'duplicate': { value: control.value } };
    return null;
  }

  clearFields() {
    this.form.get('id')?.setValue('');
    this.form.get('name')?.setValue('');
    this.form.get('logo')?.setValue('');
    this.form.get('description')?.setValue('');
    this.form.get('date_release')?.setValue('');
    this.form.get('date_revision')?.setValue('');
    this.form.updateValueAndValidity();
  }
}
