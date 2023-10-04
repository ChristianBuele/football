import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:':id',
    component:BoardComponent
  },
  {
    path:'**',
    redirectTo:''
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchRoutingModule { }
