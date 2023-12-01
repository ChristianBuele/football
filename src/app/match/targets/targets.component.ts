import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.css']
})
export class TargetsComponent {
  @Input() targetPlayer:any={
    name:'Christian Buele',
    number:10,
    color:"red",
    show:true
  }
  @Input() team:String="Deportivo Cuenca";
  
}
