import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'match',
    loadChildren:()=> import('./match/match.module').then(n=>n.MatchModule)
  },
  {
    path:'settings',
    loadChildren:()=> import('./settings/settings.module').then(n=>n.SettingsModule)
  },
  {
    path:'**',
    redirectTo:'settings'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
