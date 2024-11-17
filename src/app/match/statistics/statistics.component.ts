import { Component, Input } from '@angular/core';
import { MatchDataResponse } from '../../model/teamMatch';
import { Auspiciantes } from 'src/app/utils/auspiciantes';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  @Input() statistics:any;
  @Input() matchData!:MatchDataResponse;
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
