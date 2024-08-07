import { Component, Input } from '@angular/core';
import { Player } from 'src/app/model/player';
import { Auspiciantes } from 'src/app/utils/auspiciantes';

@Component({
  selector: 'app-match-player',
  templateUrl: './match-player.component.html',
  styleUrls: ['./match-player.component.css']
})
export class MatchPlayerComponent {
  @Input() player:Player={
    idTeam:1,
    name:'Mariano',
    titular:true,
    id:1,
    number:12
  };
  auspiciante:string='CONEXIÓN GLOBAL';

  auspiciantes=Auspiciantes.getAuspiciantes();
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  
}
