import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { PortfolioItem } from './portfolio-item.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { MOCKPORTFOLIO } from './MOCKPORTFOLIO';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  //Variables for the Service
  portfolio: PortfolioItem[] =[];
  portfolioListChangedEvent = new Subject<PortfolioItem[]>();
  maxItemId: number;

  //Event Emitters
  @Output() itemSelectedEvent = new EventEmitter <PortfolioItem>();
  @Output() itemChangedEvent  = new EventEmitter <PortfolioItem[]>();

  constructor(private httpClient: HttpClient) {
    this.portfolio = MOCKPORTFOLIO;
    this.maxItemId = this.getMaxId();
  }

  //Gets the entire portfolio
  getPortfolio() {
    return this.portfolio.slice();
  }

  getPortfolioItem(id: String) {
    return this.portfolio.find((item) => item.id === id);
  }

  //Deletes one item from the portfolio
  deleteItem(item: PortfolioItem) {
    if (!item) {
      return;
    }

    const pos = this.portfolio.indexOf(item);

    if (pos < 0) {
      return;
    }

    this.portfolio.splice(pos, 1);
    this.portfolioListChangedEvent.next(this.portfolio.slice());
  }

  //gets the max id for the next item to be added
  getMaxId(): number {
    let maxId = 0;

    this.portfolio.forEach((item) => {
      let currentId = parseInt(item.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  //adds another item to the portfolio
  addItem(newItem: PortfolioItem) {
    if (!newItem) {
      return;
    }

    this.maxItemId++;
    newItem.id = this.maxItemId.toString();

    this.portfolio.push(newItem);
    let portfolioClone = this.portfolio.slice();

    this.portfolioListChangedEvent.next(portfolioClone);
  }

  //updates an item in the portfolio
  updateItem(originalItem: PortfolioItem, newItem: PortfolioItem) {
    if (!originalItem || !newItem) {
      return;
    }

    let pos = this.portfolio.indexOf(originalItem);
    if (pos < 0) {
      return;
    }

    newItem.id = originalItem.id;
    this.portfolio[pos] = newItem;
    let portfolioClone = this.portfolio.slice();
    this.portfolioListChangedEvent.next(portfolioClone);
  }
}
