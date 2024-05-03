import { Component, Input, SimpleChanges } from '@angular/core';
import { MatchDataResponse } from 'src/app/model/teamMatch';

@Component({
  selector: 'app-half-timescore',
  templateUrl: './half-timescore.component.html',
  styleUrls: ['./half-timescore.component.css']
})
export class HalfTimescoreComponent {
  @Input() matchData!:MatchDataResponse;
  @Input() marcador!:any;
  targetsCatalog={
    AMARILLA:1,
    ROJA:2
  }
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

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('Llegan estadisticas:',changes);
    if(changes['marcador']){
      this.marcador=changes['marcador'].currentValue;
    }
  }


 
}
