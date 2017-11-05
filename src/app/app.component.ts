import { Component, OnInit } from '@angular/core';
import { StockService } from './stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  myData;

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
    this.stockService.getStockData(this.stocks, this.start, this.end).then((data) => this.updateData(data));
  }

  updateData(data) {
    this.myData = data;
  }


}
