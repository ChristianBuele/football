import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private baseUrl:string=environment.baseUrl+"/events";
  constructor(private http:HttpClient) { }

  postEventBoard(data:any){
    return this.http.post(this.baseUrl+"/board",data);
  }
}
