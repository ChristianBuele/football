import { Component, Input } from '@angular/core';
import { Penal } from 'src/app/model/penal';
import { MatchDataResponse, Team } from 'src/app/model/teamMatch';

@Component({
  selector: 'app-penales',
  templateUrl: './penales.component.html',
  styleUrls: ['./penales.component.css']
})
export class PenalesComponent {

  constructor() { 
    this.calcularTotalPenalesAcertados( );
  }
  @Input() matchData!:MatchDataResponse;
  @Input() show:boolean=true;
  @Input() penalesLocal:Penal[]=[];
  @Input() penalesVisit:Penal[]=[];


  totalLocal:number=0;
  totalVisit:number=0;
  calcularTotalPenalesAcertados(){
    this.totalLocal=0;
    this.totalVisit=0;
    this.penalesLocal.forEach((penal)=>{
      if(penal.score && penal.play){
        this.totalLocal++;
      }
    });
    this.penalesVisit.forEach((penal)=>{
      if(penal.score && penal.play){
        this.totalVisit++;
      }
    });
  }

  ngOnChanges(){
    this.calcularTotalPenalesAcertados();
  }

 
}
