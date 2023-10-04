import { Component } from '@angular/core';
import { TeamsServiceService } from '../services/teams-service.service';
import { Team } from 'src/app/model/teamMatch';
import { Table } from 'primeng/table';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Player } from 'src/app/model/player';
import { PlayersService } from '../services/players.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  constructor(private teamsService: TeamsServiceService, private fb: FormBuilder, private messageService: MessageService, private playersService: PlayersService) {

  }
  teams: Team[] = [];
  loading: boolean = false;
  loadingPlayers: boolean = false;
  showDialog: boolean = false;
  showDialogPlayers: boolean = false;
  showDialogNewPlayer: boolean = false;
  selectedTeam!: Team;
  teamsForm = this.fb.group({
    name: ['', [Validators.required]],
    color: ['', [Validators.required]]
  });

  playerForm = this.fb.group({
    name: ['', [Validators.required]],
    number: [0, [Validators.required]],
    titular: [true, [Validators.required]],
    idTeam: [0, [Validators.required]]
  });
  players: Player[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loading = true;
    this.teamsService.getAllTeams().subscribe(
      (data) => {
        console.log(data);
        this.teams = data.teams;
        this.loading = false;
      }
    );
  }
  clear(table: Table) {
    table.clear();
  }

  showHideDialog(band: boolean) {
    this.showDialog = band;
  }

  saveTeam() {
    console.log(this.teamsForm.value);
    if (this.teamsForm.invalid) {
      this.teamsForm.markAllAsTouched();
      return
    }
    this.loading = true;
    console.log('Formulario valido');
    this.teamsService.postTeam(this.teamsForm.value).subscribe(
      data => {
        this.loading = false;
        if (data) {
          console.log(data);
          this.teams.push(data);
          this.showHideDialog(false);
          this.teamsForm.reset();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Equipo registrado correctamente' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El equipo no pudo ser registrado' });
        }
      }
    );

  }

  openTeamPlayers(team: Team) {
    this.selectedTeam = team;
    this.showDialogPlayers = true;
    this.loadingPlayers = true;
    this.playersService.getAllPlayers(this.selectedTeam.id).subscribe(
      data => {
        this.loadingPlayers = false;
        this.players = data;
      }
    )
  }

  showHideDialogPlayers(band: boolean) {
    console.log('abriendo dialog', band);
    this.showDialogNewPlayer = band;
  }

  savePlayer() {
    console.log(this.playerForm.value);
    this.playerForm.patchValue({
      "idTeam": this.selectedTeam.id
    });
    if (this.playerForm.invalid) {
      this.playerForm.markAllAsTouched();
      return
    }
    this.loading = true;
    this.playersService.postPlayer(this.playerForm.value).subscribe(
      data => {
        this.players.push(data);
        this.showDialogNewPlayer = false;
        this.loading = false;
        this.teamsForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Jugador registrado correctamente' });
      }
    )


  }
}
