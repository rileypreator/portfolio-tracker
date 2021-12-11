import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortfolioItem } from '../portfolio-item.model';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit, OnDestroy {

  //Variables
  portfolio: PortfolioItem[] = [];
  subscription: Subscription;

  constructor( private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolio = this.portfolioService.getPortfolio();
    this.portfolioService.itemChangedEvent.subscribe((event) => {
      this.portfolio = event;
    })

    this.subscription = this.portfolioService.portfolioListChangedEvent.subscribe((portfolio: PortfolioItem[]) => {
      this.portfolio = portfolio;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
