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

  ngOnInit(): void {
    this.getSocketData();
    this.activateRoute.params.subscribe(({id})=>{
      this.matchService.getMatchTeamById(id).subscribe(
        data=>{
          console.log(data);
          this.matchData=data;
          
        }
      );
    });

  }
  getSocketData(): void {
    this.sub = this.socketService.getSocketData()
      .subscribe(data => {
       console.log(data)
       this.scoreLocal=data.scoreLocal;
       this.scoreVisit=data.scoreVisit;
       this.secondsElapsed=data.time;
    });
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
  }

  pauseTimer() {
    if (this.isRunning) {
      clearInterval(this.timer);
      this.isRunning = false;
    }
  }

  stopTimer() {
    if (this.isRunning) {
      clearInterval(this.timer);
      this.isRunning = false;
    }
    this.secondsElapsed = 0; // Reinicia los segundos a 0
  }


}
