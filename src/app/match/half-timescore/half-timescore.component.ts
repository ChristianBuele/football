import { Component, Input, SimpleChanges } from '@angular/core';
import { MatchDataResponse } from 'src/app/model/teamMatch';
import { Auspiciantes } from 'src/app/utils/auspiciantes';

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

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('Llegan estadisticas:',changes);
    if(changes['marcador']){
      this.marcador=changes['marcador'].currentValue;
      console.log('marcador:',this.marcador);
    }
  }


 
}
