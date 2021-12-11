import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioListComponent } from './portfolio/portfolio-list/portfolio-list.component';
import { PortfolioEditComponent } from './portfolio/portfolio-edit/portfolio-edit.component';
import { FormsModule } from '@angular/forms';
import { PortfolioItemComponent } from './portfolio/portfolio-list/portfolio-item/portfolio-item.component';
import { PortfolioDetailComponent } from './portfolio/portfolio-detail/portfolio-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PortfolioComponent,
    PortfolioListComponent,
    PortfolioEditComponent,
    PortfolioItemComponent,
    PortfolioDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
