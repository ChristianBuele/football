import { Component, inject, OnInit } from '@angular/core';
import { SocketServiceService } from '../services/socket-service.service';
import { ActivatedRoute } from '@angular/router';
import { BoxService } from '../../settings/services/box.service';
import { BoxModel } from 'src/app/model/box.mode';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  private activateRoute: ActivatedRoute = inject(ActivatedRoute);
  private boxService: BoxService = inject(BoxService);

  box!:BoxModel;
  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => {
      this.boxService.getBoxById(id).subscribe(
        data => {
          this.box = data;
          this.getBoxData();
        }
      );
    });
  }

  private socketService: SocketServiceService = inject(SocketServiceService);

   getBoxData(){
    this.socketService.socket.on('PlayerScore'+this.box.id?.toString(),(data:any)=>{
        
    })
  }
  
}
