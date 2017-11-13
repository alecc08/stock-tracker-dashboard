import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-manage-portfolio-page',
  templateUrl: './manage-portfolio-page.component.html',
  styleUrls: ['./manage-portfolio-page.component.css']
})
export class ManagePortfolioPageComponent implements OnInit {

  portfolioId;

  portfolio;

  constructor(private route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit() {
    this.portfolioId = this.route.snapshot.paramMap.get('id');
    console.log("Getting portfolio: " + this.portfolioId);
    this.accountService.getPortfolio(this.portfolioId).then((portfolio) => {
      this.portfolio = portfolio;
    });
  }

}
