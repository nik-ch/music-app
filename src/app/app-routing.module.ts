import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReleaseListComponent } from './components/release-list/release-list.component';

const routes: Routes = [
  {
    path: "release-list",
    component: ReleaseListComponent
  },
  {
    path: "",
    redirectTo: "/release-list",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
