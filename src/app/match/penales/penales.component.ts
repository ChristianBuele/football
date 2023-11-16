import { Component, Input } from '@angular/core';
import { Penal } from 'src/app/model/penal';
import { Team } from 'src/app/model/teamMatch';

@Component({
  selector: 'app-penales',
  templateUrl: './penales.component.html',
  styleUrls: ['./penales.component.css']
})
export class PenalesComponent {

  @Input() teams:Team[]=[
    {
      id:1,
      name:"Local",
      color:""
    },
    {
      id:2,
      name:"Visitante",
      color:""
    }
  ];
  @Input() show:boolean=true;
  @Input() penalesLocal:Penal[]=[
    {
      idTeam:1,
      play:true,
      score:true
    },
    {
      idTeam:1,
      play:false,
      score:true
    },
    {
      idTeam:1,
      play:true,
      score:false
    }
  ];
  @Input() penalesVisit:Penal[]=[
    {
      idTeam:1,
      play:true,
      score:true
    },
    {
      idTeam:1,
      play:false,
      score:true
    },
    {
      idTeam:1,
      play:false,
      score:false
    }
  ];

 
}
