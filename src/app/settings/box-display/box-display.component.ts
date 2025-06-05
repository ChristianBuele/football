import { Component, inject, OnInit } from '@angular/core';
import { BoxModel } from 'src/app/model/box.mode';
import { BoxService } from '../services/box.service';
import { ActivatedRoute } from '@angular/router';
import { BoxAction } from 'src/app/model/box.action';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-box-display',
  templateUrl: './box-display.component.html',
  styleUrls: ['./box-display.component.css']
})
export class BoxDisplayComponent implements OnInit {

  private boxService: BoxService = inject(BoxService);
  private activateRoute: ActivatedRoute = inject(ActivatedRoute);
  private eventsService:EventsService = inject(EventsService);

  secondsElapsed: number = 180;
  box!: BoxModel;
  isRunning: boolean = false;
  timer: any;
  edit: boolean = false;
  round: number = 1;
  ngOnInit(): void {

    this.activateRoute.params.subscribe(({ id }) => {
      this.boxService.getBoxById(id).subscribe({
        next: (data: BoxModel) => {
          this.box = data;
        },
        error: (error) => {
          console.error('Error fetching box:', error);
        }
      });
    });
  }
  startTimer() {
    if (!this.isRunning) {
      this.timer = setInterval(() => {
        this.secondsElapsed--
      }, 1000); // Actualiza los segundos cada segundo (1000 ms)
      this.isRunning = true;
    }
    this.emitAction({
      action: 'start',
      time: this.secondsElapsed,
      matchId: this.box.id,
      round: this.round
    })

  }
  editTime() {
    this.edit = !this.edit;
  }
  changeTime(event: any) {
    if (this.isRunning) {
      clearInterval(this.timer);
      this.isRunning = false;
    }
    this.secondsElapsed = event.value * 60;
  }
  saveTime() {
    this.edit = false;
    this.emitAction({
      action: 'start',
      time: this.secondsElapsed,
      matchId: this.box.id,
      round: this.round
    });

  }
  pauseTimer() {
    if (this.isRunning) {
      clearInterval(this.timer);
      this.isRunning = false;
    }
    this.emitAction({
      action: 'pause',
      time: this.secondsElapsed,
      matchId: this.box.id,
      round: this.round
    });
  }

  stopTimer() {
    if (this.isRunning) {
      clearInterval(this.timer);
      this.isRunning = false;
    }
    this.secondsElapsed = 180; // Reinicia los segundos a 0
    this.emitAction({
      action: 'stop',
      time: this.secondsElapsed,
      matchId: this.box.id,
      round: this.round
    });
  }

  emitAction(action:BoxAction){
    this.eventsService.postEventBoard(
      action
    ).subscribe(data=>{
      console.log('Action emitted:', data);
    })
  }
}

