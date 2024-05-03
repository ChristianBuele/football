import { Component, Input } from '@angular/core';
import { Team } from 'src/app/model/teamMatch';
import { MatchDataResponse } from '../../model/teamMatch';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  @Input() statistics:any;
  @Input() matchData!:MatchDataResponse;
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
