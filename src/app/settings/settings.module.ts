import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { PrimerNgModule } from '../primer-ng/primer-ng.module';
import { MatchsComponent } from './matchs/matchs.component';
import { TeamsComponent } from './teams/teams.component';
import { MatchComponent } from './match/match.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MinutesSecondsPipe } from '../pipes/timer';


@NgModule({
  declarations: [
    HomeComponent,
    MatchsComponent,
    TeamsComponent,
    MatchComponent,
  MinutesSecondsPipe],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    PrimerNgModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
