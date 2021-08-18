import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component"

const routes: Routes = [
  {   path: 'home', 
      component: HomeComponent,
      /*children: [
      {
        path: 'child-a', // child route path
        component: ChildAComponent, // child route component that the router renders
      },*/
  },
  //{ path: 'second-component', component:  },
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
  { path: '',   redirectTo: '/home' , pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

