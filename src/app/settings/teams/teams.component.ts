import { Component } from '@angular/core';
import { TeamsServiceService } from '../services/teams-service.service';
import { Team } from 'src/app/model/teamMatch';
import { Table } from 'primeng/table';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Player } from 'src/app/model/player';
import { PlayersService } from '../services/players.service';
import { CategorieService } from '../services/categorie.service';
import { Categorie } from 'src/app/model/categorie';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  constructor(private teamsService: TeamsServiceService,private categoryService:CategorieService, private fb: FormBuilder, private messageService: MessageService, private playersService: PlayersService) {

  }
  teams: Team[] = [];
  loading: boolean = false;
  loadingPlayers: boolean = false;
  showDialog: boolean = false;
  showDialogPlayers: boolean = false;
  selectedTeam!: Team;
  teamsForm = this.fb.group({
    name: ['', [Validators.required]],
    color: ['', [Validators.required]],
    idcategory:[,[Validators.required]]
  });

  clonedTeams: { [s: string]:Team } = {};


  players: Player[] = [];
  categories:Categorie[]=[];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.categoryService.getAllCategories().subscribe(
      data=>{
        console.log(data);
        this.categories=data.categories;
      }
    );
  }

  getTeams(event:any){
    console.log(event)
    const idCategory=event?.value.id;
    this.loading=true;
    this.teamsService.getAllTeamsByIdCategory(idCategory).subscribe(
      data=>{
        this.loading=false;
        if(data.ok){
          this.teams=data.data;
        }
      }
    )
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
    console.log('sadas')
    
  }

  closeDialog(band:any){
    this.showDialogPlayers=band;
  } 
  

  onRowEditInit(team:Team){
    this.clonedTeams[team.id!.toString()]={...team};
  }
  onRowEditSave(team:Team){
    this.teamsService.putTeam(team).subscribe(
      data=>{
        console.log(data);
        this.messageService.add({severity:'success',summary:'Success',detail:'Equipo actualizado correctamente'});
        
      }
    )
  }
  onRowEditCancel(team:Team,  index: number){
    this.teams[index]=this.clonedTeams[team.id?.toString() as string];
    delete this.clonedTeams[team.id?.toString() as string]
  }
}
