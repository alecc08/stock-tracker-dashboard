import { Component, OnInit, OnChanges } from '@angular/core';
import { StockService } from './services/stock.service';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {

  selectedPortfolio: any;
  selectedAccount: any;

  constructor(public accountService: AccountService) {

  }

  ngOnChanges(changes) {
    console.log(changes);
  }

  ngOnInit() {
    // Get accounts
    this.accountService.getAccounts();
  }

  handleError(err) {
    console.log(err);
  }

}
