import { Component } from '@angular/core';
import { MatchServiceService } from '../services/match-service.service';
import { TeamMatchResponse } from 'src/app/model/teamMatch';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.css']
})
export class MatchsComponent {
  matches: TeamMatchResponse[] = [];
  loading: boolean = false;
  constructor(private mathService: MatchServiceService,private router:Router) {

  }

  ngOnInit(): void {
    
    this.mathService.getAllMatches().subscribe(
      data => {
        this.matches = data;
        this.loading = false;
      }
    );
  }
  clear(table: Table) {
    table.clear();
  }
  startMatch(id:number){
    this.router.navigate(['/settings/match',id]);
  }
}
