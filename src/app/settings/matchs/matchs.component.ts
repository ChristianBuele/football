import { Component } from '@angular/core';
import { MatchServiceService } from '../services/match-service.service';
import { Team, TeamMatchResponse } from 'src/app/model/teamMatch';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { TeamsServiceService } from '../services/teams-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchTeamService } from '../services/match-team.service';
import { MessageService } from 'primeng/api';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from '../services/categorie.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.css']
})
export class MatchsComponent {
  matches: TeamMatchResponse[] = [];
  loading: boolean = false;
  newMatchDialog:boolean=false;
  teams:Team[]=[];
  selectedCategorie!:Categorie;
  matchForm=this.fb.group({
    teamLocal:[,[Validators.required]],
    teamVisit:[,[Validators.required]],
    date:[,[Validators.required]],
    location:[,[Validators.required]],
    minutes:[,[Validators.required]],
    categorie:[this.selectedCategorie,[Validators.required]]
  });
  categories:Categorie[]=[];
  constructor( private clipboardApi: ClipboardService,private categorieService:CategorieService,private messaageService:MessageService,private mathService: MatchServiceService,private router:Router,private teamsService:TeamsServiceService,private fb: FormBuilder,private matchTeamService:MatchTeamService) {

  }

  ngOnInit(): void {
    
    this.categorieService.getAllCategories().subscribe(
      data=>{
        this.categories=data.categories;
        if(this.categories.length>0){
          this.selectedCategorie=this.categories[0];
          this.getMatches({
              value:this.selectedCategorie
          });
        }
      }
    );
  }

  getTeams(event:any){
    const id=event.value.id;
    console.log(event);
    this.selectedCategorie=event.value;
    this.matchForm.controls['categorie'].setValue(this.selectedCategorie);
    console.log(this.matchForm.value)
    this.teamsService.getAllTeamsByIdCategory(id).subscribe(
      data=>{
        this.teams=data.data;
      }
    );
  }
  getMatches(event:any){
    const id=event.value.id;
    console.log(event);
    this.selectedCategorie=event.value;
    this.matchForm.controls['categorie'].setValue(this.selectedCategorie);
    console.log(this.matchForm.value)
    this.loading=true;
    this.mathService.getAllMatchesByCategorieId(this.selectedCategorie.id?.toString()??'').subscribe(
      data => {
        this.matches = data;
        this.loading = false;
      }
    );
    this.getTeams({
      value:this.selectedCategorie
    })
  }


  clear(table: Table) {
    table.clear();
  }
  startMatch(id:number){
    this.router.navigate(['/settings/match',id]);
  }

  saveMatch(){
    console.log('guardando')
    if(this.matchForm.invalid){
      this.matchForm.markAllAsTouched();
      console.log(this.matchForm)
      return
    }
    this.loading=true;
    this.matchTeamService.postMatchTeam(this.matchForm.value).subscribe(
      data=>{
        this.loading=false;
        this.newMatchDialog=false;
        this.matchForm.reset()
        this.matchForm.controls['categorie'].setValue(this.selectedCategorie);
        this.messaageService.add({severity:'success', summary: 'Success', detail: 'Match created'});
        this.getMatches({
          value:{
            id:this.matchForm.controls['categorie'].value?.id
          }
        });
      }
    );
  }

  copyPathMatch(path:string){
    const dominio=window.location.origin;
    const url=dominio+"/match/"+path
    this.clipboardApi.copyFromContent(url);
    console.log(url)
    this.messaageService.add({
      severity:'success',
      summary:'Success',
      detail:'Url copied'
    })
  }
  
}
