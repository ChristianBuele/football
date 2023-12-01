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

  auspiciantes=[
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

  mostrarTitulares:boolean=true;
  mostrarSuplentes:boolean=true;
  constructor() { }

}
