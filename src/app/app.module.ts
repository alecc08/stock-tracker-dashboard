import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { HttpModule } from '@angular/http';
import { StockService } from './services/stock.service';
import { AlertModule } from 'ngx-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { StockGraphPageComponent } from './stock-graph-page/stock-graph-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ManageAccountPageComponent } from './manage-account-page/manage-account-page.component';
import { ManagePortfolioPageComponent } from './manage-portfolio-page/manage-portfolio-page.component';
import { AccountService } from './services/account.service';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'stocks', component: StockGraphPageComponent },
  { path: 'accounts', component: ManageAccountPageComponent },
  { path: 'portfolio/:id', component: ManagePortfolioPageComponent },
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
    StockGraphPageComponent,
    DashboardPageComponent,
    ManageAccountPageComponent,
    ManagePortfolioPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    HttpModule
  ],
  providers: [StockService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
