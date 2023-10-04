import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchServiceService } from '../services/match-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatchDataResponse } from 'src/app/model/teamMatch';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {
  constructor(private fb: FormBuilder,private matchService:MatchServiceService,private activateRoute:ActivatedRoute){
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Tablero', icon: 'pi pi-fw pi-desktop' },
      { label: 'Tarjetas', icon: 'pi pi-fw pi-file' },
      { label: 'Cambios', icon: 'pi pi-fw pi-replay' },
      { label: 'Estadisticas', icon: 'pi pi-fw pi-chart-bar' }
  ];
  this.activeItem = this.items[0];
    this.activateRoute.params.subscribe(({id})=>{
      this.matchService.getMatchTeamById(id).subscribe(
        data=>{
          console.log(data);
          this.matchData=data;
        }
      );
    });
    
  }

  scoreForm=this.fb.group({
    scoreLocal:[0,[Validators.required]],
    scoreVisit:[0,[Validators.required]],
    time:[0,[Validators.required]],
    id:[0],
    play:[false]
  });
  matchData!:MatchDataResponse;
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  edit:boolean=false;
  play:boolean=false;
  elapsetSeconds:number=0;

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
    this.scoreForm.controls['time'].value
}

activateLast() {
    this.activeItem = (this.items as MenuItem[])[(this.items as MenuItem[]).length - 1];
}

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
        this.scoreForm.controls['time'].setValue(this.secondsElapsed);
        this.saveData();
      }, 1000); // Actualiza los segundos cada segundo (1000 ms)
      this.isRunning = true;
      this.scoreForm.controls['play'].setValue(true);
      this.saveData();
    }
  }

  pauseTimer() {
    if (this.isRunning) {
      clearInterval(this.timer);
      this.isRunning = false;
      this.scoreForm.controls['play'].setValue(false);
      this.saveData();
    }
  }

  stopTimer() {
    if (this.isRunning) {
      clearInterval(this.timer);
      this.isRunning = false;
    }
    this.secondsElapsed = 0; // Reinicia los segundos a 0
    this.scoreForm.controls['time'].setValue(this.secondsElapsed);
    this.scoreForm.controls['play'].setValue(false);
    this.saveData();
  }
}
