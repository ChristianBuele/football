import { Component, Input } from '@angular/core';
import { Player } from 'src/app/model/player';
import { Team } from 'src/app/model/teamMatch';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {

  @Input() scoreData:any;
  @Input() show!:boolean;
}
