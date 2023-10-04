import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import { TargetsComponent } from './targets/targets.component';
import { TimeComponent } from './time/time.component';
import { ChangesComponent } from './changes/changes.component';
import { BoardComponent } from './board/board.component';
import { HomeComponent } from './home/home.component';
import { PrimerNgModule } from '../primer-ng/primer-ng.module';



@NgModule({
  declarations: [
    TargetsComponent,
    TimeComponent,
    ChangesComponent,
    BoardComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MatchRoutingModule,
    PrimerNgModule
  ]
})
export class MatchModule { }
