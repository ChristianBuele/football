import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { HomeComponent } from "./home/home.component";
import { MatchsComponent } from "./matchs/matchs.component";
import { TeamsComponent } from "./teams/teams.component";
import { MatchComponent } from "./match/match.component";
import { BoxPanelComponent } from "./box-panel/box-panel.component";
import { BoxDisplayComponent } from "./box-display/box-display.component";

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
                path:'boxing',
                component:BoxPanelComponent
            },
            {
                path: 'boxing/:id',
                component: BoxDisplayComponent
            },
            {
                path: '**',
                redirectTo: 'matches'
            },
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