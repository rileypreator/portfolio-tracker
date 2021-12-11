import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioItem } from '../portfolio-item.model';
import { PortfolioService } from '../portfolio.service';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.css']
})
export class PortfolioDetailComponent implements OnInit {

  nativeWindow: any;
  item: PortfolioItem;
  constructor(private portfolioService: PortfolioService, private router: Router, private activatedRoute: ActivatedRoute, private windRefService: WindRefService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((event) => {
      this.item = this.portfolioService.getPortfolioItem(event.id)!;
    });

    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onView() {
    if (this.item.link) {
      this.nativeWindow.open(this.item.link);
    }
  }

  onDelete() {
    this.portfolioService.deleteItem(this.item);
    this.router.navigate(['./portfolio']);
  }

}
