import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.css']
})
export class TargetsComponent {
  @Input() targetPlayer:any={
    name:'',
    number:0,
    color:"red",
    show:false
  }
  @Input() team:String="";
}
