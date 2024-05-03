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
  showBoard:boolean=false;
  teamTargetChange:string='Portul';

  ngOnInit(): void {

    this.activateRoute.params.subscribe(({ id }) => {
      this.matchService.getMatchTeamById(id).subscribe(
        data => {
          console.log(data);
          this.matchData = data;
          this.getPlayerScore();
          this.getTargetPlayer();
          this.getChangePlayer();
          this.getLineup();
          this.getMatchPlayer();
          this.getEvents();
          this.getMatchData();
          this.getTimeEvents();
          this.getPenales();
          this.getShowBoard();
          this.getStatistics();
          this.getStatisticsMarcador();
        }
      );
    });

  }
  getMatchData(): void {
  this.socketService.socket.on('MatchScoreTest' + this.matchData.match.id?.toString(),
   ( data:any) => {
        this.scoreLocal = data.scoreLocal;
        this.scoreVisit = data.scoreVisit;
      });
  }

  timeEvents: any;
  getTimeEvents(): void {
    this.socketService.socket.on('TimeEvents'+ this.matchData.match.id?.toString(),
      (data:any)=>{
        this.timeEvents=data;
      }
    )
  }
  getTargetPlayer() {
    this.socketService.socket.on('MatchTarget' + this.matchData.match.id?.toString(), (data: any) => {
      this.teamTargetChange= this.matchData.teams.find((team)=>{
        return team.id==data.player.idTeam;
      })?.name.substring(0)!;
      this.targetPlayer.name = data.player.name;
      this.targetPlayer.number = data.player.number;
      this.targetPlayer.show = true;
      this.targetPlayer.color = data.isYellow ? 'yellow' : 'red';
      console.log(data)
      setTimeout(() => {
        this.targetPlayer.show = false;
      }, 10000);
    });
    //despues de 10 s ejecutar una accion
  }

  showEntra:boolean=true;
  getChangePlayer(){
    this.socketService.socket.on('MatchChange' + this.matchData.match.id?.toString(), (data: any) => {
      console.log(data);
      this.teamTargetChange= this.matchData.teams.find((team)=>{
        return team.id==data.entra.idTeam;
      })?.name.substring(0)!;
      this.changePlayers[0]=data.entra;
      this.changePlayers[1]=data.sale;
      setTimeout(()=>{
        this.showEntra=false;
      },7500)
      setTimeout(() => {
        this.changePlayers=[];
        this.showEntra=true;
      }, 15000);
    });
  }

  getLineup(){
    this.socketService.socket.on('MatchLineup' + this.matchData.match.id?.toString(), (data: any) => {
      console.log(data);
      this.titulares=data.titulares;
      this.suplentes=data.suplentes;
      this.selectedTeam=data.team;
      this.showLineup=data.show;
     
    });
  }

  getMatchPlayer(){
    this.socketService.socket.on('MatchPlayer'+this.matchData.match.id?.toString(),(data:any)=>{
      console.log(data);
      this.matchPlayer=data;
      setTimeout(()=>{
        this.matchPlayer=undefined;
      },30000);
    })
  }
  statistics:any;
  getStatistics(){
    this.socketService.socket.on('Statistics'+this.matchData.match.id?.toString(),(data:any)=>{
      this.statistics=data;
    console.log(this.statistics);
    })
  }

  getEvents(){
    this.socketService.socket.on('EventsBoard'+this.matchData.match.id?.toString(),(data:any)=>{
      console.log(data);
      if(data.name='showBoard'){
        this.showBoard=data.data
      }
    })
  }

  showScore:boolean=true;
  scoreData!:any;
  getPlayerScore(){
    this.socketService.socket.on('PlayerScore'+this.matchData.match.id?.toString(),(data:any)=>{
        console.log("gollll")
        this.showScore=true;
        this.scoreData=data;
        setTimeout(()=>{
          this.showScore=false;
        },10000);
    })
  }

  penalesData:any={
    show:false,
    local:[],
    visit:[]
  };
  getPenales(){
    this.socketService.socket.on('Penal'+this.matchData.match.id?.toString(),(data:any)=>{
      console.log(data);
      this.penalesData=data;
    });
  }

  getShowBoard(){
    this.socketService.socket.on('ShowBoard'+this.matchData.match.id?.toString(),(data:any)=>{
      console.log(data);
      this.showBoard=data.show;
    })
  }

  statisticsMarcador:any;
  getStatisticsMarcador(){
    this.socketService.socket.on('StatisticsMarcador'+this.matchData.match.id?.toString(),(data:any)=>{
      this.statisticsMarcador=data;
    })
  }

 
}
