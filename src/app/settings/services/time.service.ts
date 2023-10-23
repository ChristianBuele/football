import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private baseUrl:string=environment.baseUrl;
  constructor(private http:HttpClient ) { }

  postTimeEvent(data:any){
    return this.http.post(this.baseUrl+'/matches/time',data);
  }
}
