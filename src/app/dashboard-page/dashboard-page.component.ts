import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  accounts;
  selectedAccount = {};

  constructor(public accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAccounts().then(() => {
      this.accounts = this.accountService.accounts;
      this.selectAccount(this.accounts[0]);
    });
  }

  selectAccount(account) {
    this.selectedAccount = account;
  }

  getCombinedTableData() {
    return [];
  }

  getTableData(portfolio) {
    return [];
  }

}
