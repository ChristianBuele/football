import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MatchTeamService {

  constructor(private http:HttpClient) { }
  private baseUrl:string=environment.baseUrl;
  postMatchTeam(data:any){
    return this.http.post(this.baseUrl+"/matchTeam",data);
  }
}
