import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import { TargetsComponent } from './targets/targets.component';
import { TimeComponent } from './time/time.component';
import { ChangesComponent } from './changes/changes.component';
import { BoardComponent } from './board/board.component';
import { HomeComponent } from './home/home.component';
import { PrimerNgModule } from '../primer-ng/primer-ng.module';
import { LineupComponent } from './lineup/lineup.component';
import { MatchPlayerComponent } from './match-player/match-player.component';
import { HalfTimescoreComponent } from './half-timescore/half-timescore.component';
import { PenalesComponent } from './penales/penales.component';
import { ScoreComponent } from './score/score.component';
import { StatisticsComponent } from './statistics/statistics.component';



@NgModule({
  declarations: [
    TargetsComponent,
    TimeComponent,
    ChangesComponent,
    BoardComponent,
    HomeComponent,
    LineupComponent,
    MatchPlayerComponent,
    HalfTimescoreComponent,
    PenalesComponent,
    ScoreComponent,
    StatisticsComponent,
  ],
  imports: [
    CommonModule,
    MatchRoutingModule,
    PrimerNgModule
  ]
})
export class MatchModule { }
