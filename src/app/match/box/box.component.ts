import { Component, inject, OnInit } from '@angular/core';
import { SocketServiceService } from '../services/socket-service.service';
import { ActivatedRoute } from '@angular/router';
import { BoxService } from '../../settings/services/box.service';
import { BoxModel } from 'src/app/model/box.mode';
import { BoxAction } from 'src/app/model/box.action';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  private activateRoute: ActivatedRoute = inject(ActivatedRoute);
  private boxService: BoxService = inject(BoxService);

  box!:BoxModel;

  timer: any;
  secondsElapsed: number = 0;
  isRunning: boolean = false;


  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => {
      this.boxService.getBoxById(id).subscribe(
        data => {
          this.box = data;
          this.getBoxData();
        }
      );
    });
  }

  private socketService: SocketServiceService = inject(SocketServiceService);

   getBoxData(){
    this.socketService.socket.on('EventsBoard'+this.box.id?.toString(),(data:BoxAction)=>{
        this.prepareEvents(data);
    })
  }

  prepareEvents(event:BoxAction){
    this.box.round = event.round;
    if(event.action === 'start'){
        
        this.secondsElapsed=event.time;
        this.startTimer();

      }
      if(event.action === 'pause'){
        this.pauseTimer();
      }

      if(event.action === 'stop'){
        this.secondsElapsed=event.time;
        this.stopTimer();
      }
  }
  startTimer() {
    if (!this.isRunning) {
      this.timer = setInterval(() => {
        this.secondsElapsed--
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
