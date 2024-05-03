import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable , of} from 'rxjs';
import { Team } from 'src/app/model/teamMatch';
import { map, catchError, retry } from 'rxjs/operators';
import { TeamResponse } from 'src/app/model/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsServiceService {
  private baseUrl:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllTeams():Observable<TeamResponse>{
    return this.http.get(this.baseUrl+'/teams').pipe(
      map(
        data=>{
          return data as TeamResponse;
        }
      ),
      catchError(
        error=>{
          return of();
        }
      )
    );
  }

  getAllTeamsByIdCategory(id:string){
    return this.http.get<any>(this.baseUrl+"/teams/"+id).pipe(
      map(
        data=>{
         return {
          ok:true,
          data:data.teams as Team[]
         }
        }
      ),
      catchError(
        error=>{
          return of(
            {
              ok:false,
              data:[]
            }
          );
        }
      )
    );
  }

  postTeam(team:any):Observable<Team>{
    return this.http.post<Team>(this.baseUrl+'/teams',team).pipe(
      map(
        data=>{
          console.log(data);
          return data;
        } 
      ),
      catchError(
        error=>{
          console.log(error);
          return of();
        }
      )
    )
  }

  putTeam(team:Team):Observable<Team>{
    return this.http.put<Team>(this.baseUrl+"/teams/"+team.id.toString(),team);
  }
}
