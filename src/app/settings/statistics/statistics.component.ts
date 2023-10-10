import { Component, Input, SimpleChanges } from '@angular/core';
import { Player } from 'src/app/model/player';
import { PlayersService } from '../services/players.service';
import { Match } from 'src/app/model/match';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  constructor(private playersService:PlayersService,private activateRoute:ActivatedRoute,private fb:FormBuilder,private messageService:MessageService){}

  players:any[]=[];
  loading:boolean=false;
  playerForm=this.fb.group({
    player:[,[Validators.required]],
    matchId:[,[Validators.required]]
  })

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({id})=>{
      this.playerForm.controls['matchId'].setValue(id);
      this.playersService.getPlayersByMatch(id).subscribe(data=>{
        this.players=data;
      });
    })
  }

  showTeamPlayer(){
    if(this.playerForm.invalid){
      this.playerForm.markAllAsTouched();
      
      return
    }
    this.loading=true;
    this.playersService.postTeamPlayer(this.playerForm.value).subscribe(
      data=>{
        this.loading=false;
        this.messageService.add({
          severity:'success',
          summary:'Success',
          detail:'Jugador mostrado en pantalla exitosamente'
        })
      }
    );
  }


}
