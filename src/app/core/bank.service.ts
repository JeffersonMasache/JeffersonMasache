import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinancialProduct } from '../shared/models/financial-product';

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

  public updateFinancialService(product: FinancialProduct): Promise<FinancialProduct> {
    return firstValueFrom(this.httpClient.put<FinancialProduct>(this.baseUrl, product));
  }

  public verificateProduct(id: string): Promise<boolean> {
    const url = '/verification'
    let options = { params: { 'id': id } };
    return firstValueFrom(this.httpClient.get<boolean>(this.baseUrl + url, options));
  }

  public deleteProduct(id: string): Promise<any> {
    return firstValueFrom(this.httpClient.delete(this.baseUrl, { params: { 'id': id }, responseType: 'text' }));
  }
}

