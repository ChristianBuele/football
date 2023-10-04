import { Component, Input } from '@angular/core';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})
export class ChangesComponent {
  @Input() entra!:Player;
  @Input() sale!:Player;
  constructor(){
    
  }
}
