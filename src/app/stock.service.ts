import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class StockService {

  apiUrl = 'http://localhost:8080/stocks?';
  options = null;

  constructor(private http: Http) { }

  getStockData(stocks, start, end): Promise<any[]> {
    console.log(this.apiUrl + `stockCodes=${stocks}&start=${start}&end=${end}`);
    return this.http.get(this.apiUrl + `stockCodes=${stocks}&start=${start}&end=${end}`).toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  private handleError(err) {
    console.log('ERROR!' + err);
  }

}
