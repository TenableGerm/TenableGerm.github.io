import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExperimentationComponent } from './experimentation/experimentation.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { PastProjectsComponent } from './past-projects/past-projects.component';
import { GenericDropdownPanelComponent } from './shared/generic-dropdown-panel/generic-dropdown-panel.component';
import { RubiksCubeComponent } from './rubiks-cube/rubiks-cube.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    SideBarComponent,
    FooterComponent,
    ExperimentationComponent,
    PageNotFoundComponent,
    PastProjectsComponent,
    GenericDropdownPanelComponent,
    RubiksCubeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
