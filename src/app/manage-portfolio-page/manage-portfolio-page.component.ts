import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import * as Moment from 'moment';

@Component({
  selector: 'app-manage-portfolio-page',
  templateUrl: './manage-portfolio-page.component.html',
  styleUrls: ['./manage-portfolio-page.component.css']
})
export class ManagePortfolioPageComponent implements OnInit {

  buy: Boolean = true;
  symbol: String;
  quantity: Number;
  price: Number;
  date: String;

  portfolioId;

  portfolio: any = {};

  constructor(private route: ActivatedRoute, public accountService: AccountService) { }

  ngOnInit() {
    this.portfolioId = this.route.snapshot.paramMap.get('id');
    console.log("Getting portfolio: " + this.portfolioId);
    this.accountService.getPortfolio(this.portfolioId).then((portfolio) => {
      this.portfolio = portfolio;
    });
  }

  setModalFields(buy, stock?, qty?, time?, price?) {
    this.buy = buy;
    this.symbol = stock;
    this.quantity = qty;
    this.date = time || Moment().format("YYYY-MM-DD");
    this.price = price;
  }

  buyOrSellStock() {
      this.accountService.buySellStock(this.portfolio, this.symbol, this.buy ? this.quantity : -this.quantity , this.price, this.date).then((res) => {
        alert("Successfully bought/sold stocks.");
      });
  }

  formatDate(timeInMillis) {
    return Moment.unix(timeInMillis).format("YYYY-MM-DD");
  }

}
