import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MatchDataResponse, TeamMatchResponse } from 'src/app/model/teamMatch';
import { environment } from 'environments/environment.prod';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchServiceService {

  constructor(private http:HttpClient) { }
  private baseUrl:string=environment.baseUrl;
  getAllMatches():Observable<TeamMatchResponse[]>{
    return this.http.get(this.baseUrl+"/matchTeam").pipe(
      map(
        data=>{
          return data as TeamMatchResponse[];
        }
      ),
      catchError(
        error=>{
          return of();
        }
      )
    );
  }

  getMatchTeamById(id:number):Observable<MatchDataResponse>{
    return this.http.get<MatchDataResponse>(this.baseUrl+"/matchTeam/"+id.toString()).pipe(
      map(data=>{
        return data;
      })
    );
  }

  postScore(data:any){
    return this.http.post(this.baseUrl+"/matches/score",data);
  }
}
