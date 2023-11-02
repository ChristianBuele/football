import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent {
  timer: any;
  secondsElapsed: number = 0;
  isRunning: boolean = false;

  @Input() timeEvent:any;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['timeEvent'] && !changes['timeEvent'].firstChange){
      if(this.timeEvent.event === 'start'){
        
        this.secondsElapsed=parseInt(this.timeEvent.time);
        this.startTimer();

      }
      if(this.timeEvent.event === 'pause'){
        this.pauseTimer();
      }

      if(this.timeEvent.event === 'stop'){
        this.secondsElapsed=parseInt(this.timeEvent.time);
        this.stopTimer();
      }

    }
  }

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
