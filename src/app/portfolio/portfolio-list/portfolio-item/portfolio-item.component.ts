import { Component, Input, OnInit } from '@angular/core';
import { PortfolioItem } from '../../portfolio-item.model';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.css']
})
export class PortfolioItemComponent implements OnInit {

  @Input() item: PortfolioItem;
  constructor() { }

  ngOnInit(): void {
  }

}
