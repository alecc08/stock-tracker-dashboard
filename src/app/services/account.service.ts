import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Moment from 'moment';

@Injectable()
export class AccountService {

  apiUrl = 'http://localhost:8080/';

  @Output()
  accounts;

  @Output()
  accountsUpdatedEvent: EventEmitter<any[]> = new EventEmitter();

  constructor(private http: Http) { }

  getAccounts(): Promise<any[]> {
    return this.http.get(this.apiUrl + 'accounts').toPromise()
    .then(response => {
      this.accounts = response.json();
      console.log(this.accounts);
      return this.accounts;
    })
    .catch(this.handleError);
  }

  createAccount(accountName): Promise<any> {
    console.log("Adding account: " + accountName);
    return this.http.post(this.apiUrl + 'accounts', {accountName: accountName}, {headers: new Headers({'Content-Type': 'application/json'})}).toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  deleteAccount(accountId): Promise<any> {
    if (confirm("Are you sure?")) {
      console.log("Deleting account: " + accountId);
      return this.http.delete(this.apiUrl + 'accounts?accountId=' + accountId, {headers: new Headers({'Content-Type': 'application/json'})}).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
    }
  }

  getPortfolio(portfolioId): Promise<any> {
    console.log("Getting portfolio: " + portfolioId);
    return this.http.get(this.apiUrl + 'portfolios?portfolioId=' + portfolioId,
      {headers: new Headers({'Content-Type': 'application/json'})}).toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  createPortfolio(portfolioName, accountId): Promise<any> {
    console.log("Adding portfolio: " + portfolioName);
    return this.http.post(this.apiUrl + 'portfolios', {portfolioName: portfolioName, accountId: accountId},
      {headers: new Headers({'Content-Type': 'application/json'})}).toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  deletePortfolio(portfolioId): Promise<any> {
    console.log("Deleting portfolio: " + portfolioId);
    return this.http.delete(this.apiUrl + 'portfolios?portfolioId=' + portfolioId, {headers: new Headers({'Content-Type': 'application/json'})}).toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  buySellStock(portfolio, symbol, quantity, price, date): Promise<any> {
    console.log("Buying stock: " + symbol + " for portfolioId:" + portfolio.id);

    if (!portfolio.stocks) {
      portfolio.stocks = [];
    }
    // Push new stock if new symbol ELSE update existing qty and add/remove earnings...
    portfolio.stocks.push({
      portfolioId: portfolio.id,
      symbol: symbol,
      purchaseQuantity: quantity,
      purchasePrice: price,
      purchaseTime: Moment(date, "YYYY-MM-DD").unix()
    });
    return this.http.put(this.apiUrl + 'portfolios', {portfolio: portfolio},
      {headers: new Headers({'Content-Type': 'application/json'})}).toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  private handleError(err) {
    alert("ERROR: " + err);
  }
}
