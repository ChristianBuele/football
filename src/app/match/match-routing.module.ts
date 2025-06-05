import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';
import { BoxComponent } from './box/box.component';

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
    path:'box/:id',
    component:BoxComponent
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
