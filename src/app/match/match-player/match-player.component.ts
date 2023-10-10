import { Component, Input } from '@angular/core';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-match-player',
  templateUrl: './match-player.component.html',
  styleUrls: ['./match-player.component.css']
})
export class MatchPlayerComponent {
  @Input() player!:Player;
  auspiciante:string='Don Bonice';
  
}
