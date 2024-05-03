import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Player } from 'src/app/model/player';
import { Team } from 'src/app/model/teamMatch';
import { PlayersService } from '../services/players.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {

  @Input()showDialogPlayers:boolean=false;
  @Input()selectedTeam!:Team;
  @Output() closeDialog = new EventEmitter<boolean>();
  players:Player[]=[];
  playerForm = this.fb.group({
    name: ['', [Validators.required]],
    number: [null],
    titular: [false, [Validators.required]],
    idTeam: [0, [Validators.required]],
    present:[true,[Validators.required]]
  });
  clonedPlayers: { [s: string]: Player } = {};
  loading:boolean=false;
  showDialogNewPlayer:boolean=false;

  constructor(private fb: FormBuilder,private playersService: PlayersService,private messageService: MessageService){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedTeam'] && !changes['selectedTeam'].firstChange){
      this.getPlayers();
    }
  }

  savePlayer() {
    console.log(this.playerForm.value);
    this.playerForm.patchValue({
      "idTeam": this.selectedTeam.id,
      "present":true
    });
    if (this.playerForm.invalid) {
      this.playerForm.markAllAsTouched();
      return
    }
    //if number is null, set with 0
    if(this.playerForm.value.number==null){
      this.playerForm.get("number")?.patchValue(0 as any);
    }

    this.loading = true;
    this.playersService.postPlayer(this.playerForm.value).subscribe(
      data => {
        this.getPlayers();
        this.showDialogNewPlayer = false;
        this.loading = false;
        this.playerForm.reset();
        this.playerForm.patchValue({
          "idTeam": this.selectedTeam.id,
          "present":true,
          "titular":false
        });
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Jugador registrado correctamente' });
      }
    )
  }

  getPlayers(){
    this.loading = true;
    this.playersService.getAllPlayers(this.selectedTeam.id).subscribe(
      data => {
        this.loading = false;
        this.players = data;
      }
    )
  }

  closeDialogPlayers(){
    this.closeDialog.emit(false);
  }
  onRowEditInit(player:Player){
    this.clonedPlayers[player.id!.toString()]={...player};
  }
  onRowEditSave(player:Player){
    this.playersService.putPlayer(player).subscribe(
      data=>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Jugador actualizado correctamente' });
        this.getPlayers();
      }
    );
  }
  onRowEditCancel(player:Player,  index: number){
    this.players[index]=this.clonedPlayers[player.id?.toString() as string];
    delete this.clonedPlayers[player.id?.toString() as string]
  }

  deletePlayer(id:number){
    this.loading=true;
    this.playersService.deletePlayer(id).subscribe(
      data=>{
        this.loading=false;
        if(data.status){
          this.getPlayers();
          this.messageService.add(
            {
              severity: 'success', summary: 'Success', detail: 'Jugador eliminado correctamente'
            }
          )
        }else{
          this.messageService.add(
            {
              severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el jugador: '+data.message
            }
          )
        }
      }
    )
  }
}
