import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchServiceService } from '../services/match-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatchDataResponse, Team } from 'src/app/model/teamMatch';
import { MenuItem, MessageService } from 'primeng/api';
import { Player } from 'src/app/model/player';
import { PlayersService } from '../services/players.service';
import { EventsService } from '../services/events.service';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {
  constructor(private fb: FormBuilder,private timeService:TimeService ,private messageService:MessageService,private eventsService:EventsService,private matchService:MatchServiceService,private activateRoute:ActivatedRoute,private playersService:PlayersService){
  }

  ngOnInit(): void {
   
    this.activateRoute.params.subscribe(({id})=>{
      this.matchService.getMatchTeamById(id).subscribe(
        data=>{
          console.log(data);
          this.matchData=data;
          this.selectedTeam=this.matchData.teams[0];
        }
      );
    });
    
  }

  scoreForm=this.fb.group({
    scoreLocal:[0,[Validators.required]],
    scoreVisit:[0,[Validators.required]],
    id:[0],
  });
  changeForm=this.fb.group({
    "entra":[,[Validators.required]],
    "sale":[,[Validators.required]],
    "matchId":['',[Validators.required]],
    "team":[""]
  });
  matchData!:MatchDataResponse;
  players:Player[]=[];
  edit:boolean=false;
  play:boolean=false;
  elapsetSeconds:number=0;
  selectedTeam!:Team;
  entra!:Player;
  sale!:Player;


  saveData(){
    
    this.scoreForm.controls['id'].setValue(this.matchData.match.id!);
    this.matchService.postScore(this.scoreForm.value).subscribe(
      data=>{
        console.log(data);
      }
    )
  }

  timer: any;
  secondsElapsed: number = 0;
  isRunning: boolean = false;

  startTimer() {
    if (!this.isRunning) {
      this.timer = setInterval(() => {
        this.secondsElapsed++;
      }, 1000); // Actualiza los segundos cada segundo (1000 ms)
      this.isRunning = true;
    }
    this.setTimeEvent({
      "event":'start',
      "time":this.secondsElapsed.toString(),
      "id":this.matchData.match.id
    })
  
  }

  pauseTimer() {
    if (this.isRunning) {
      clearInterval(this.timer);
      this.isRunning = false;
    }
    this.setTimeEvent({
      "event":'pause',
      "time":this.secondsElapsed.toString(),
      "id":this.matchData.match.id
    })
  }

  stopTimer() {
    if (this.isRunning) {
      clearInterval(this.timer);
      this.isRunning = false;
    }
    this.secondsElapsed = 0; // Reinicia los segundos a 0
    this.setTimeEvent({
      "event":'stop',
      "time":this.secondsElapsed.toString(),
      "id":this.matchData.match.id
    })
  }
  

  getPlayers(){
    this.playersService.getPlayersByTeam(this.selectedTeam.id).subscribe(
      data=>{
        this.players=data;
      }
    )
  }

  showTarget(isYellow:boolean,player:Player){
    
    this.playersService.postPlayerTarget({isYellow,player,"matchId":this.matchData.match.id}).subscribe(data=>{
      console.log(data)
    });
  }

  cambio(){
    this.changeForm.controls['matchId'].setValue(this.matchData.match.id?.toString()!);
    if(this.changeForm.invalid){
      this.changeForm.markAllAsTouched();
      return;
    }
    //set team name in changeForm
    this.changeForm.controls['team'].setValue(this.selectedTeam.name);
    this.playersService.postChangePlayer(this.changeForm.value).subscribe(
      data=>{
        console.log(data);
        this.changeForm.reset();
        this.messageService.add({
          severity:'success',
          summary:'Success',
          detail:'Cambio registrado correctamente'
        })
      }
    )
  }
  editTime(){
    this.edit=!this.edit;
  }

  setTime(data:any){
    console.log(data)
  }
  showFormation:boolean=true;
  showFormacion(local:boolean){
    
    const idTeam=local?this.matchData.teams[0].id:this.matchData.teams[1].id;

    this.playersService.postLineUp({idTeam,matchId:this.matchData.match.id,show:this.showFormation}).subscribe(data=>{
      console.log(data);
      if(this.showFormation){
        this.messageService.add({
          severity:'success',
          summary:'Success',
          detail:'Formación mostrada correctamente'
        });
      }else{
        this.messageService.add({
          severity:'info',
          summary:'Success',
          detail:'Formación ocultada correctamente'
        });
      }
      this.showFormation=!this.showFormation;
    });
  }
  
  showBoardLive:boolean=true;
  showBoard(){
    
    this.eventsService.postEventBoard(
      {
        "matchId":this.matchData.match.id,
        "name":"showBoard",
        "data":this.showBoardLive
      }
    ).subscribe(data=>{
      this.showBoardLive=!this.showBoardLive;
    })
  }

  setTimeEvent(data:any){
    this.timeService.postTimeEvent(data).subscribe(
      data=>{
        console.log(data);
      }
    );
  }

  
  saveScore(player:Player){
    this.playersService.postScore({
      player,
      team:this.selectedTeam,
      id:this.matchData.match.id
    }).subscribe(
      data=>{
        if(data.status){
          this.messageService.add({
            severity:'success',
            summary:'Success',
            detail:data.message
          })
        }else{
          this.messageService.add({
            severity:'error',
            summary:'Error',
            detail:data.message
          })
        }
      }
    )
  }
}
