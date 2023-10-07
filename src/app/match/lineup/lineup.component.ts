import { Component, Input } from '@angular/core';
import { Player } from 'src/app/model/player';
import { Team } from 'src/app/model/teamMatch';

@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.css']
})
export class LineupComponent {

  @Input() show:boolean=false;
  @Input() titulares:Player[]=[
  ];
  @Input() suplentes:Player[]=[
  ];
  @Input()team!:Team;

  mostrarTitulares:boolean=true;
  mostrarSuplentes:boolean=true;
  constructor() { }

}
