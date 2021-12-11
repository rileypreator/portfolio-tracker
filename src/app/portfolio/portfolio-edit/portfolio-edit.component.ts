
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PortfolioItem } from '../portfolio-item.model';
import { PortfolioService } from '../portfolio.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-portfolio-edit',
  templateUrl: './portfolio-edit.component.html',
  styleUrls: ['./portfolio-edit.component.css']
})
export class PortfolioEditComponent implements OnInit {

  //Variables
  originalItem: PortfolioItem;
  item: PortfolioItem;
  editMode: boolean = false;

  constructor(private portfolioService: PortfolioService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params["id"];

      if (!id) {
        this.editMode = false;
        return;
      }

      this.originalItem = this.portfolioService.getPortfolioItem(id)!;

      if (!this.originalItem) {
        return;
      }

      this.editMode = true;
      this.item = JSON.parse(JSON.stringify(this.originalItem));
    })
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newItem = new PortfolioItem("", value.name, value.link, value.description, value.date);

    if (this.editMode == true) {
      this.portfolioService.updateItem(this.originalItem, newItem);
    }
    else {
      this.portfolioService.addItem(newItem);
    };

    this.router.navigate(['/portfolio']);
  }

  onCancel() {
    this.router.navigate(['/portfolio']);
  }

}
