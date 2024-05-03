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
  getAllMatchesByCategorieId(id:string):Observable<TeamMatchResponse[]>{
    return this.http.get(this.baseUrl+"/matchTeam/category/"+id).pipe(
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
    return this.http.get<MatchDataResponse>(this.baseUrl+"/matchTeam/"+id.toString());
  }

  postScore(data:any){
    return this.http.post(this.baseUrl+"/matches/score",data);
  }

  postPenales(data:any){
    return this.http.post(this.baseUrl+"/matches/penales",data).pipe(
      map(
        data=>{
          return {
            status:true,
            data:data
          }
        }
      ),
      catchError(
        error=>{
          return of(
            {
              status:false,
              data:error
            }
          );
        }
      )
    );
  }

  showDisableBoard(data:any){
    return this.http.post(this.baseUrl+"/matches/showDisableBoard",data).pipe(
      map(
        data=>{
          return {
            status:true,
            data:data
          }
        }
      ),
      catchError(
        error=>{
          return of(
            {
              status:false,
              data:error
            }
          );
        }
      )
    );
  }

  postStatistics(data:any){
    return this.http.post(this.baseUrl+"/matches/statistics/add",data).pipe(
      map(
        data=>{
          return {
            ok:true,
            msg:'Datos Mostrados correctamente'
          }
        }
      ),
      catchError(
        error=>{
          return of(
            {
              ok:false,
              msg:"No se pudo mostrar los datos"
            }
          )
        }
      )
    );
  }

  showMarcador(data:any){
    return this.http.post(this.baseUrl+"/matches/statistics/marcador",data).pipe(
      map(
        data=>{
          return {
            ok:true,
          }
        }
      ),
      catchError(
        error=>{
          return of(
            {
              ok:false
            }
          )
        }
      )
    );
  }
}
