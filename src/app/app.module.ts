import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { ChartModule, GrowlModule } from 'primeng/primeng';
import { HttpModule } from '@angular/http';
import { StockService } from './stock.service';

@NgModule({
  declarations: [
    AppComponent,
    StockChartComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    GrowlModule,
    FormsModule,
    HttpModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
