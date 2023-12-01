import { Component, Input } from '@angular/core';
import { MatchDataResponse} from 'src/app/model/teamMatch';
import { MatchServiceService } from '../services/match-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-penales',
  templateUrl: './penales.component.html',
  styleUrls: ['./penales.component.css']
})
export class PenalesComponent {

  constructor(private matchService:MatchServiceService,private messageService:MessageService) {
    
   }
  
  cantidadPenales:number=3;
  penalesLocal:any[]=[];
  penalesVisit:any[]=[];
  showPenal:boolean=false;

  @Input() matchData!:MatchDataResponse

  estadoPenales=[
    {
      name:"Marcado",
    },
    {
      name:"Fallado",
    },
    {
      name:"Pendiente",
    }
  ]

  generarPenales(){
    this.penalesLocal=[];
    this.penalesVisit=[];
    for(let i=0;i<this.cantidadPenales;i++){
      this.penalesLocal.push({
        id:i,
        play:false,
        score:false
      });
      this.penalesVisit.push({
        id:i,
        play:false,
        score:false
      });
    }
  }

  changePenalStatus(penal:any,pos:number,local:boolean){
    switch(penal.value.name){
      case "Marcado":
        if(local){
          this.penalesLocal[pos].score=true;
          this.penalesLocal[pos].play=true;
        }else{
          this.penalesVisit[pos].score=true;
          this.penalesVisit[pos].play=true;
        }
        break;
      case "Fallado":
        if(local){
          this.penalesLocal[pos].score=false;
          this.penalesLocal[pos].play=true;
        }
        else{
          this.penalesVisit[pos].score=false;
          this.penalesVisit[pos].play=true;
        }
        break;
      case "Pendiente":
        if(local){
          this.penalesLocal[pos].score=false;
          this.penalesLocal[pos].play=false;
        }
        else{
          this.penalesVisit[pos].score=false;
          this.penalesVisit[pos].play=false;
        }
        break;
    }
  }

  guardarPenales(){
    this.matchService.postPenales({local:this.penalesLocal,visit:this.penalesVisit,id:this.matchData.match.id,show:this.showPenal}).subscribe(
      (data:any)=>{
        if(data.status){
          this.messageService.add({severity:'success',summary:'Penales',detail:'Penales guardados correctamente'});
        }
        else{
          this.messageService.add({severity:'error',summary:'Penales',detail:'Error al guardar penales'});
        }

      }
    );
  }

  mostrarOcultar(event:any){
    this.guardarPenales();
  }

 
}
