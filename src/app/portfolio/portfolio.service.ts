import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { PortfolioItem } from './portfolio-item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MOCKPORTFOLIO } from './MOCKPORTFOLIO';
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  //Variables for the Service
  portfolio: PortfolioItem[] = [];
  portfolioListChangedEvent = new Subject<PortfolioItem[]>();
  maxItemId: number;

  //Event Emitters
  @Output() itemSelectedEvent = new EventEmitter<PortfolioItem>();
  @Output() itemChangedEvent = new EventEmitter<PortfolioItem[]>();

  constructor(private http: HttpClient) {
    this.maxItemId = this.getMaxId();
  }

  //Gets the entire portfolio
  getPortfolio() {
    this.http.get("http://localhost:3000/portfolio")
    
    .subscribe((value: any) =>{
          this.portfolio = value.portfolio;
          console.log(value);
          console.log(this.portfolio);
          this.maxItemId = this.getMaxId();
          this.sortAndSend();
        },

        (error: any) => {
          console.log(error);
        }
      );

      return this.portfolio;
  }

  getPortfolioItem(id: String) {
    return this.portfolio.find((item) => item.id === id);
  }

  //Deletes one item from the portfolio
  deleteItem(item: PortfolioItem) {
    if (!item) {
      return;
    }

    const pos = this.portfolio.findIndex(d => d.id === item.id);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/portfolio/' + item.id)
      .subscribe((response) => {
        this.portfolio.splice(pos, 1);
        this.sortAndSend();
      })
  }

  //gets the max id for the next item to be added
  getMaxId() {
    let maxId = 0;
    const numArr = this.portfolio.map(item => parseInt(item.id));
    maxId = Math.max(...numArr);

    return maxId;
  }

  //adds another item to the portfolio
  addItem(newItem: PortfolioItem) {
    if (!newItem) {
      return;
    }

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{message: string, newItem: PortfolioItem}>('http://localhost:3000/portfolio',
      newItem,
      { headers: headers})
      .subscribe((responseData) => {
          console.log(responseData);
          this.portfolio.push(responseData.newItem);
          this.sortAndSend();
      })
  }

  //updates an item in the portfolio
  updateItem(originalItem: PortfolioItem, newItem: PortfolioItem) {
    if (!originalItem || !newItem) {
      return;
    }

    const pos = this.portfolio.findIndex(d => d.id === originalItem.id);

    if (pos < 0) {
      return;
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    newItem.id = originalItem.id;

    this.http.put('http://localhost:3000/portfolio/' + originalItem.id, 
      newItem, {headers: headers})
      .subscribe((response) => {
        this.portfolio[pos] = newItem;
        this.sortAndSend();
      })
  }

  sortAndSend() {
    this.portfolio.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    this.portfolioListChangedEvent.next(this.portfolio.slice());
  }

  storePortfolio() {
    let JSONPortfolio = JSON.stringify(this.portfolio);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put("http://localhost:3000/portfolio", JSONPortfolio, {headers: headers})
      .subscribe(()=> {
        this.portfolioListChangedEvent.next(this.portfolio.slice())
      })
  }
}
