import { Component, OnInit, Output } from '@angular/core';
import { Http } from '@angular/http';
import { AccountService } from '../services/account.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-manage-account-page',
  templateUrl: './manage-account-page.component.html',
  styleUrls: ['./manage-account-page.component.css']
})
export class ManageAccountPageComponent implements OnInit {

  accountName;
  portfolioName;

  selectedAccountId;

  constructor(private accountService: AccountService) {

  }

  ngOnInit() {
    this.updateAccounts();
  }

  addAccount() {
    this.accountService.createAccount(this.accountName).then(() => this.updateAccounts());
    this.accountName = "";
    $('#closeAccountModal').click();
  }
  selectAccountId(id) {
    this.selectedAccountId = id;
  }
  deleteAccount(accountId) {
    this.accountService.deleteAccount(accountId).then(() => this.updateAccounts());
  }
  addPortfolio() {
    this.accountService.createPortfolio(this.portfolioName, this.selectedAccountId).then(() => this.updateAccounts());
    this.portfolioName = "";
    $('#closePortfolioModal').click();
    this.updateAccounts();
  }
  updateAccounts() {
    this.accountService.getAccounts();
  }
}
