import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinancialProduct } from './shared/models/financial-product';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public getFinancialServices(): Promise<FinancialProduct[]> {
    return firstValueFrom(this.httpClient.get<FinancialProduct[]>(this.baseUrl));
  }

  public addFinancialService(product: FinancialProduct): Promise<FinancialProduct> {
    return firstValueFrom(this.httpClient.post<FinancialProduct>(this.baseUrl, product));
  }
}
