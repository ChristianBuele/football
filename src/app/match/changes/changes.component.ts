import { Component, Input } from '@angular/core';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})
export class ChangesComponent {
  @Input() entra:Player={
    idTeam:1,
    name:'Christian',
    number:1,
    titular:true,
    id:1
  };
  @Input() sale:Player={
    idTeam:1,
    name:'sas',
    number:1,
    titular:true,
    id:1
  };
  @Input() team:string="Hola";
  constructor(){
    
  }
}
