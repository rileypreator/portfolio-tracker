import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PortfolioDetailComponent } from "./portfolio/portfolio-detail/portfolio-detail.component";
import { PortfolioEditComponent } from "./portfolio/portfolio-edit/portfolio-edit.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";

const appRoutes: Routes = [
    {
        path: '', redirectTo: '/portfolio', pathMatch: 'full'
    },
    {
        path: 'portfolio', component: PortfolioComponent, children:
        [
            { path: "new", component: PortfolioEditComponent},
            { path: ":id", component: PortfolioDetailComponent},
            { path: ":id/edit", component: PortfolioEditComponent}
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}