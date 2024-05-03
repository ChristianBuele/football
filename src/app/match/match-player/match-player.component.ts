import { Component, Input } from '@angular/core';
import { Player } from 'src/app/model/player';

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
  auspiciante:string='ALVID MASTER';

  auspiciantes=[
    {
      name:"assets/auspiciantes/pc.jpg"
    },
    {
      name:"assets/auspiciantes/alvid.jpg",
    },
    {
      name:"assets/auspiciantes/nuevo.jpg"
    },
    {
      name:"assets/auspiciantes/mcm.jpg"
    },
    {
      name:"assets/auspiciantes/rc.jpg"
    },
    {
      name:"assets/auspiciantes/ing.jpg"
    },
    {
      name:"assets/auspiciantes/ds.jpg"
    },
    {
      name:"assets/auspiciantes/ss.jpg"
    },
    {
      name:"assets/auspiciantes/cs.jpg"
    },
    {
      name:"assets/auspiciantes/ab.jpg"
    },
    {
      name:"assets/auspiciantes/rl.jpg"
    },
    {
      name:"assets/auspiciantes/rpc.jpg"
    },
    {
      name:"assets/auspiciantes/bg.jpg"
    }

  ]
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
