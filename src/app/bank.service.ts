import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public getFinancialServices() {
    return this.httpClient.get(this.baseUrl).toPromise();
  }
}
