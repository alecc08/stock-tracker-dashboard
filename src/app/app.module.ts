import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { HttpModule } from '@angular/http';
import { StockService } from './stock.service';
import { AlertModule } from 'ngx-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { StockGraphPageComponent } from './stock-graph-page/stock-graph-page.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: StockGraphPageComponent },
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/dashboard' }
];


@NgModule({
  declarations: [
    AppComponent,
    StockChartComponent,
    StockGraphPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
