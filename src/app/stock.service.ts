import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class StockService {

  apiUrl = 'http://localhost:8080/';
  options = null;

  constructor(private http: Http) { }

  getStockData(stocks, start, end): Promise<any[]> {
    return this.http.get(this.apiUrl + `stocks?stockCodes=${stocks}&start=${start}&end=${end}`).toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  getAccounts(): Promise<any[]> {
    return this.http.get(this.apiUrl + 'accounts').toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  createAccount(accountName): Promise<any[]> {
    return this.http.post(this.apiUrl + 'accounts', {accountName: accountName}).toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  private handleError(err) {
    alert("ERROR: " + err);
  }

}
