import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { HomeComponent } from "./home/home.component";
import { MatchsComponent } from "./matchs/matchs.component";
import { TeamsComponent } from "./teams/teams.component";
import { MatchComponent } from "./match/match.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'matches',
                component: MatchsComponent
            },
            {
                path: 'teams',
                component: TeamsComponent
            },
            {
                path:'match/:id',
                component:MatchComponent
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }
   
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class SettingsRoutingModule { }