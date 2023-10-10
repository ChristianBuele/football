import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchDataResponse, Team } from 'src/app/model/teamMatch';
import { MatchServiceService } from 'src/app/settings/services/match-service.service';
import { SocketServiceService } from '../services/socket-service.service';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  constructor(private activateRoute: ActivatedRoute, private matchService: MatchServiceService, private socketService: SocketServiceService) {
    this.socketService.socket.on('connect', () => {
      console.log('Connect to Socket Server...');

    });

  }
  matchData!: MatchDataResponse;
  subTablero!: Subscription;
  subTargets!: Subscription;
  scoreLocal: number = 0;
  scoreVisit: number = 0;
  secondsElapsed: number = 0;
  targetPlayer: any = {
    name: '',
    number: 0,
    color: "red",
    show: false
  }
  changePlayers: Player[] = [];

  titulares:Player[]=[];
  suplentes:Player[]=[];
  selectedTeam!:Team;
  showLineup:boolean=false;
  matchPlayer!:Player|undefined;

  ngOnInit(): void {

    this.activateRoute.params.subscribe(({ id }) => {
      this.matchService.getMatchTeamById(id).subscribe(
        data => {
          console.log(data);
          this.matchData = data;
          this.getMatchData();
          this.getTargetPlayer();
          this.getChangePlayer();
          this.getLineup();
          this.getMatchPlayer()
        }
      );
    });

  }
  getMatchData(): void {
    this.subTablero = this.socketService.getSocketData("MatchScore" + this.matchData.match.id?.toString())
      .subscribe(data => {
        console.log(data)
        this.scoreLocal = data.scoreLocal;
        this.scoreVisit = data.scoreVisit;
        this.secondsElapsed = data.time;
      });
  }
  getTargetPlayer() {
    this.socketService.socket.on('MatchTarget' + this.matchData.match.id?.toString(), (data: any) => {
      this.targetPlayer.name = data.player.name;
      this.targetPlayer.number = data.player.number;
      this.targetPlayer.show = true;
      this.targetPlayer.color = data.isYellow ? 'yellow' : 'red';
      setTimeout(() => {
        this.targetPlayer.show = false;
      }, 3000);
    });
    //despues de 10 s ejecutar una accion
  }

  getChangePlayer(){
    this.socketService.socket.on('MatchChange' + this.matchData.match.id?.toString(), (data: any) => {
      console.log(data)
      this.changePlayers[0]=data.entra;
      this.changePlayers[1]=data.sale;
      setTimeout(() => {
        this.changePlayers=[];
      }, 10000);
    });
  }

  getLineup(){
    this.socketService.socket.on('MatchLineup' + this.matchData.match.id?.toString(), (data: any) => {
      console.log(data);
      this.titulares=data.titulares;
      this.suplentes=data.suplentes;
      this.selectedTeam=data.team;
      this.showLineup=true;
      setTimeout(()=>{
        this.showLineup=false;
      },5000);
    });
  }

  getMatchPlayer(){
    this.socketService.socket.on('MatchPlayer'+this.matchData.match.id?.toString(),(data:any)=>{
      console.log(data);
      this.matchPlayer=data;
      setTimeout(()=>{
        this.matchPlayer=undefined;
      },10000);
    })
  }
}
