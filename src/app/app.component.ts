import { Component, OnInit } from '@angular/core';
import { StockService } from './stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  accounts: any[];
  selectedPortfolio: any;
  selectedAccount: any;

  constructor(private stockService: StockService) {

  }

  ngOnInit() {
    // Get accounts
    this.stockService.getAccounts().then((accounts) => this.accounts = accounts)
      .catch(this.handleError);
  }

  selectAccount() {

  }
  selectPortfolio() {

  }

  handleError(err) {
    console.log(err);
  }

}
