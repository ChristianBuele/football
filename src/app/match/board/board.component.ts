import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchDataResponse } from 'src/app/model/teamMatch';
import { MatchServiceService } from 'src/app/settings/services/match-service.service';
import { SocketServiceService } from '../services/socket-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  constructor(private activateRoute:ActivatedRoute,private matchService:MatchServiceService,private socketService:SocketServiceService){
    this.socketService.socket.on('connect', () => {
      console.log('Connect to Socket Server...');
    });

  }
  matchData!:MatchDataResponse;
  sub!: Subscription;
  scoreLocal:number=0;
  scoreVisit:number=0;
  secondsElapsed: number = 0;

  ngOnInit(): void {
    
    this.activateRoute.params.subscribe(({id})=>{
      this.matchService.getMatchTeamById(id).subscribe(
        data=>{
          console.log(data);
          this.matchData=data;
          this.getSocketData();
        }
      );
    });

  }
  getSocketData(): void {
    this.sub = this.socketService.getSocketData(this.matchData.match.id!)
      .subscribe(data => {
       console.log(data)
       this.scoreLocal=data.scoreLocal;
       this.scoreVisit=data.scoreVisit;
       this.secondsElapsed=data.time;
    });
  }

  
 
}
