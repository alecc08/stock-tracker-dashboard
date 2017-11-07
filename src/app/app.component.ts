import { Component, OnInit } from '@angular/core';
import { StockService } from './stock.service';
import * as Moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  myData;

  loading = false;

  stocks: String = 'MSFT,GOOG';
  start = "2017-01-20";
  end = "2017-08-20";

  constructor(private stockService: StockService) {
    this.myData = [];
  }

  ngOnInit() {
    this.getStocks();
  }

  getStocks() {
    this.loading = true;
    this.stockService.getStockData(this.stocks, this.start, this.end).then((data) => this.updateData(data));
  }

  updateData(data) {
    this.loading = false;
    this.myData = data;
  }

  adjustTime(numDays) {
    const today = Moment();
    this.end = today.format("YYYY-MM-DD");
    this.start = today.add(-numDays, 'day').format("YYYY-MM-DD");
    this.getStocks();
  }


}
