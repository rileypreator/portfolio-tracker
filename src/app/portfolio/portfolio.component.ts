import { Component, OnDestroy, OnInit } from '@angular/core';
import { PortfolioItem } from './portfolio-item.model';
import { PortfolioService } from './portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  //Variables that will be used in the component
  selectedItem: PortfolioItem;
  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.itemSelectedEvent.subscribe((result) => {
      this.selectedItem = result;
    })
  }

  ngOnDestroy(): void {
      
  }

}
