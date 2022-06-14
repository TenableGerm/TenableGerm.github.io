import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentationComponent } from './experimentation/experimentation.component';
import { HomeComponent } from "./home/home.component"
import { PastProjectsComponent } from './past-projects/past-projects.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {   
    path: '', 
    component: HomeComponent,
    /*children: [
      {
        path: 'exp', // child route path
        component: ExperimentationComponent, // child route component that the router renders
      },
    ]*/
  },
  {   
    path: 'exp', 
    component: ExperimentationComponent,
  },
  {   
    path: 'pastprojects', 
    component: PastProjectsComponent,
  },
  //{ path: 'second-component', component:  },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
  { path: '',   redirectTo: '' , pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

