import { Component, inject, OnInit } from '@angular/core';
import { BoxService } from '../services/box.service';
import { BoxModel } from 'src/app/model/box.mode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-box-panel',
  templateUrl: './box-panel.component.html',
  styleUrls: ['./box-panel.component.css']
})
export class BoxPanelComponent implements OnInit {
  ngOnInit(): void {
    this.getAllBoxes();
  }

  private boxesService:BoxService = inject(BoxService);
  private router:Router = inject(Router);

  boxes:BoxModel[] = [
    {
      id:1,
      nombre_local: 'Local 1',
      nombre_visita: 'Visita 1',
      peso_local: '10kg',
      peso_visita: '12kg'
    }
  ];


  getAllBoxes(): void {
    this.boxesService.getAllBoxes().subscribe({
      next: (data: BoxModel[]) => {
        debugger
        this.boxes = data;
      },
      error: (error) => {
        console.error('Error fetching boxes:', error);
      }
    });
  }

  playBox(box: BoxModel): void {
    this.router.navigate(['/settings/boxing',box.id]);
  }
}
