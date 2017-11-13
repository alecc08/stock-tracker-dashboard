import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AccountService {

  apiUrl = 'http://localhost:8080/';

  @Output()
  accounts;

  @Output()
  accountsUpdatedEvent: EventEmitter<any[]> = new EventEmitter();

  constructor(private http: Http) { }

  getAccounts(): Promise<any[]> {
    this.http.get(this.apiUrl + 'accounts').toPromise()
    .then(response => { this.accounts = response.json(); })
    .catch(this.handleError);
    return this.accounts;
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

  buySellStock(symbol, quantity, price, date, portfolioId): Promise<any> {
    console.log("Buying stock: " + symbol);
    let found;
    this.accounts.forEach((account) => {
      account.portfolios.forEach((portfolio) => {
        if (portfolio.id === portfolioId) {
          found = portfolio;
          if (!portfolio.stocks) {
            portfolio.stocks = [];
          }
          // Push new stock if new symbol ELSE update existing qty and add/remove earnings...
          portfolio.stocks.push({

          });
        }
      });
    });
    return this.http.put(this.apiUrl + 'portfolios', found,
      {headers: new Headers({'Content-Type': 'application/json'})}).toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  private handleError(err) {
    alert("ERROR: " + err);
  }
}
