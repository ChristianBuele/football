import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { MatchServiceService } from '../services/match-service.service';
import { TeamMatchResponse } from 'src/app/model/teamMatch';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent {
  
  items: MenuItem[] | undefined;

  constructor() {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.items = [
      {
        label: 'Partidos',
        icon: 'pi pi-fw pi-globe',
        routerLink:'matches'
      },
      {
        label: 'Equipos',
        icon: 'pi pi-fw pi-users',
        routerLink:'teams'
      }
    ];
  }
}
