import { Component, Input, SimpleChanges } from '@angular/core';
import { Player } from 'src/app/model/player';
import { PlayersService } from '../services/players.service';
import { Match } from 'src/app/model/match';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MatchServiceService } from '../services/match-service.service';
import { MatchDataResponse } from 'src/app/model/teamMatch';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  constructor(private playersService: PlayersService, private activateRoute: ActivatedRoute, private fb: FormBuilder, private messageService: MessageService,private matchService:MatchServiceService) { }

  players: any[] = [];
  loading: boolean = false;
  playerForm = this.fb.group({
    player: [, [Validators.required]],
    matchId: [, [Validators.required]]
  });
  @Input() scoreLocal:any;
  @Input() scoreVisit:any;

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
    if(changes['scoreLocal']){
      this.statisticsFormLocal.controls['goles'].setValue(changes['scoreLocal'].currentValue)
    }else if(changes['scoreVisit']){
      this.statisticsFormVisit.controls['goles'].setValue(changes['scoreVisit'].currentValue)
    }
    console.log(this.statisticsFormLocal.value)
  }

  statisticsFormLocal = this.fb.group({
    position: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
    yellow: [0, [Validators.required, Validators.min(0)]],
    red: [0, [Validators.required, Validators.min(0)]],
    tiros: [0, [Validators.required, Validators.min(0)]],
    goles:[0,[Validators.required]]
  });
  statisticsFormVisit = this.fb.group({
    position: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
    yellow: [0, [Validators.required, Validators.min(0)]],
    red: [0, [Validators.required, Validators.min(0)]],
    tiros: [0, [Validators.required, Validators.min(0)]],
    goles:[0,[Validators.required]]
  });
  @Input() matchData!:MatchDataResponse;
  timeNames=[
    'Previa',
    'Entretiempo',
    'Final'
  ];
  selectedTime:string='Previa';

  items:any[]=[
    {
      name:'Goles',
      type:'number',
      key:'goles'
    },
    {
      name:'Posición',
      type:'number',
      key:'position'
    },
    {
      name:'Rojas',
      type:'number',
      key:'red'
    },
    {
      name:'Amarillas',
      type:'number',
      key:'yellow'
    }
  ]
  matchId!:any;
  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => {
      this.playerForm.controls['matchId'].setValue(id);
      this.playersService.getPlayersByMatch(id).subscribe(data => {
        this.players = data;
        console.log('statiscsddadsds')
        console.log(this.players);
        this.matchId=id;
      });
    })
  }

  showTeamPlayer() {
    if (this.playerForm.invalid) {
      this.playerForm.markAllAsTouched();

      return
    }
    this.loading = true;
    this.playersService.postTeamPlayer(this.playerForm.value).subscribe(
      data => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Jugador mostrado en pantalla exitosamente'
        })
      }
    );
  }

  showStatisticsBand:boolean=false;
  showStatistics(){
    console.log(this.statisticsFormLocal);
    console.log(this.statisticsFormVisit)
    if(this.statisticsFormLocal.invalid || this.statisticsFormVisit.invalid){
      this.statisticsFormLocal.markAllAsTouched();
      this.statisticsFormVisit.markAllAsTouched();
      return;
    }
    this.matchService.postStatistics(
      {
        local:this.statisticsFormLocal.value,
        visit:this.statisticsFormVisit.value,
        id:this.playerForm.controls['matchId'].value,
        show:!this.showStatisticsBand
      }
    ).subscribe(
      data=>{
        if(data.ok ){
          if(!this.showStatisticsBand){
            this.messageService.add(
              {
                severity:'success',
                summary:'Exito',
                detail:'Estadisticas mostradas correctamente'
              }
            )
          }else{
            this.messageService.add(
              {
                severity:'success',
                summary:'Exito',
                detail:'Estadisticas ocultadas correctamente'
              }
            )
          }
          this.showStatisticsBand=!this.showStatisticsBand;
        }else{
          this.messageService.add(
            {
              severity:'error',
              summary:'Error',
              detail:'Estadisticas no mostradas'
            }
          )
        }
      }
    );
  }

  setPosition(event:any,local:boolean){
    const value=event.value;
    if(local){
      this.statisticsFormLocal.controls['position'].setValue(value);
      this.statisticsFormVisit.controls['position'].setValue(100-value);
    }else{
      this.statisticsFormVisit.controls['position'].setValue(100-value);
      this.statisticsFormLocal.controls['position'].setValue(value);
    }
  }
  showMarcadorBand:boolean=true;
  loadingStatistics:boolean=false;
  showMarcador(){
    this.loadingStatistics=true;
    this.matchService.showMarcador({
      show:this.showMarcadorBand,
      local:this.scoreLocal,
    visit:this.scoreVisit,
    tiempo:this.selectedTime,
    id:this.matchId
    }).subscribe(
      data=>{
        this.loadingStatistics=false;
        console.log(data)
        if(data.ok==true ){
          if(!this.showMarcadorBand){
            this.messageService.add(
              {
                severity:'success',
                summary:'Exito',
                detail:'Estadisticas mostradas correctamente'
              }
            )
          }else{
            this.messageService.add(
              {
                severity:'success',
                summary:'Exito',
                detail:'Estadisticas ocultadas correctamente'
              }
            )
          }
          this.showMarcadorBand=!this.showMarcadorBand;
        }else{
          this.messageService.add(
            {
              severity:'error',
              summary:'Error',
              detail:'Estadisticas no mostradas'
            }
          )
        }
      }
    )
  }
}
