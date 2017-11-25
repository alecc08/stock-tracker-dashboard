import { StockService } from './../services/stock.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import * as Moment from 'moment';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  accounts;
  selectedAccount: any = {};
  allTableData: any = [];
  inPct = true; // Display amount in percent gains

  timeComparisonInMonths = [1, 2, 3, 4, 5, 6, 12];

  constructor(private accountService: AccountService, private stockService: StockService) { }

  ngOnInit() {
    this.accountService.getAccounts().then(() => {
      this.accounts = this.accountService.accounts;
      this.selectAccount(this.accounts[0]);
    });
  }

  selectAccount(account) {
    this.selectedAccount = account;
    this.refreshTableData();
  }

  refreshTableData() {
    let allStocks = {};
    this.allTableData = [];
    if (this.selectedAccount && this.selectedAccount.portfolios) {
      this.selectedAccount.portfolios.forEach(portfolio => {
        portfolio.stocks.forEach(stock => {
          allStocks[stock.symbol] = stock;
        });
      });
      Object.keys(allStocks).forEach((stockSymbol) => {
        this.stockService.getStockData(stockSymbol, Moment.unix(allStocks[stockSymbol].purchaseTime).format("YYYY-MM-DD"), Moment().format("YYYY-MM-DD")).then((stocks) => {
          const stock = allStocks[stockSymbol];
          console.log(stocks);
          const numStocks = stocks[stockSymbol].length;
          this.allTableData.push([
            {text: stockSymbol, title: "Some title"},
            {text: (stocks[stockSymbol][numStocks - 1].close / stock.purchasePrice * 100).toFixed(2), title: "Profit since purchase date"},
            ...this.generateProfitArray(stock, stocks[stockSymbol])]);
        });
      });
      console.log(JSON.stringify(allStocks));
    }
  }

  generateProfitArray(stock, stocks): Number[] {
    let arr = [];
    this.timeComparisonInMonths.forEach((time) => {
      for (let i = 0; i < stocks.length; i++) {
        if (Moment.unix(stocks[i].timestamp).diff(Moment.unix(stock.purchaseTime), 'days') > (30 * time)) {
          arr.push({text: Math.round((stocks[i].close - stock.purchasePrice) * 100 / 100).toFixed(2), title: "Amount of profit in " + time + " month(s)"});
          break;
        }
      }
    });
    if (arr.length < this.timeComparisonInMonths.length) {
      for (let i = 0; i < this.timeComparisonInMonths.length - arr.length; i++) {
        arr.push({text: "--"});
      }
    }
    return arr;
  }

  isNum(obj) {
    return !isNaN(obj);
  }

  getTableData(portfolioId) {
    return [];
  }

}
