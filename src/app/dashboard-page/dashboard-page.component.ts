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
  allTableData: any = {};
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
    this.allTableData = {};
    this.refreshTableData();
  }

  refreshTableData() {
    if (this.selectedAccount && this.selectedAccount.portfolios) {
      this.selectedAccount.portfolios.forEach(portfolio => {
        this.allTableData[portfolio.id] = [];
        portfolio.stocks.forEach((stockSymbol) => {
          this.stockService.getStockData(stockSymbol.symbol, Moment.unix(stockSymbol.purchaseTime).format("YYYY-MM-DD"), Moment().format("YYYY-MM-DD")).then((stocks) => {
            if (stocks[stockSymbol.symbol]) {
              const numStocks = stocks[stockSymbol.symbol].length;
              const currentPrice = stocks[stockSymbol.symbol][numStocks - 1].close;
              this.allTableData[portfolio.id].push([
                {text: stockSymbol.symbol, title: "Some title"},
                {text: this.getProfit(stocks[stockSymbol.symbol][numStocks - 1].close, stockSymbol.purchasePrice),
                  title: "Profit since " + Moment.unix(stockSymbol.purchaseTime).format("YYYY-MM-DD")},
                ...this.generateProfitArray(stockSymbol, stocks[stockSymbol.symbol], currentPrice)]);
            }
          });
        });
      });
    }
  }

  getProfit(price1, price2) {
    if (this.inPct) {
      return ((price1 - price2) / price1 * 100).toFixed(2);
    } else {
      return (price1 - price2).toFixed(2);
    }
  }

  generateProfitArray(stock, stockHistory, currentPrice): Number[] {
    let arr = [];
    this.timeComparisonInMonths.forEach((time) => {
      for (let i = 0; i < stockHistory.length; i++) {
        if (Moment.unix(stockHistory[i].timestamp).diff(Moment.unix(stock.purchaseTime), 'days') > (30 * time)) {
          arr.push({text: this.getProfit(stockHistory[i].close, currentPrice), title: "Amount of profit since " + time + " month(s)"});
          break;
        }
      }
    });
    if (arr.length < this.timeComparisonInMonths.length) {
      while (arr.length < this.timeComparisonInMonths.length) {
        arr.push({text: "-"});
      }
    }
    return arr;
  }

  isNum(obj) {
    return !isNaN(obj);
  }

}
