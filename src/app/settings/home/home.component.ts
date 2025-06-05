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
      },
      {
        label:'Boxeo',
        icon: 'pi pi-fw pi-box',
        routerLink:'boxing'
      },
      {
        label: 'Radio',
        icon: 'pi pi-fw pi-volume-up',
        routerLink:'radio'
      }
    ];
  }
}
