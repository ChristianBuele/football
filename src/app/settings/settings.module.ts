import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { PrimerNgModule } from '../primer-ng/primer-ng.module';
import { MatchsComponent } from './matchs/matchs.component';
import { TeamsComponent } from './teams/teams.component';
import { MatchComponent } from './match/match.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayersComponent } from './players/players.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PenalesComponent } from './penales/penales.component';
import { RadioComponent } from './radio/radio.component';
import { BoxPanelComponent } from './box-panel/box-panel.component';
import { BoxDisplayComponent } from './box-display/box-display.component';


@NgModule({
  declarations: [
    HomeComponent,
    MatchsComponent,
    TeamsComponent,
    MatchComponent,
    PlayersComponent,
    StatisticsComponent,
    PenalesComponent,
    RadioComponent,
    PenalesComponent,
    BoxPanelComponent,
    BoxDisplayComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    PrimerNgModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
