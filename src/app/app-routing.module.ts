import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadioComponent } from './radio/radio.component';

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
    path:'radio',
    component:RadioComponent
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
