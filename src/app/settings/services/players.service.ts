import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable, map } from 'rxjs';
import { Player, PlayersResponse } from 'src/app/model/player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private baseUrl:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getAllPlayers(id:number):Observable<Player[]>{
    return this.http.get<PlayersResponse>(this.baseUrl+"/players/"+id.toString()).pipe(
      map(
        data=>{
          return data.players;
        }
      )
    );
  }

  postPlayer(player:any):Observable<Player>{
    return this.http.post<Player>(this.baseUrl+"/players",player);
  }

  getPlayersByTeam(idTeam:number):Observable<Player[]>{
    return this.http.get<PlayersResponse>(this.baseUrl+"/players/"+idTeam.toString()).pipe(
      map(data=>{
        return data.players;
      })
    )
  }

  postPlayerTarget(data:any){
    return this.http.post(this.baseUrl+"/players/target",data);
  }

  postChangePlayer(data:any){
    return this.http.post(this.baseUrl+"/players/change",data);
  }

  postLineUp(data:any){
    return this.http.post(this.baseUrl+"/players/lineup",data);
  }

  putPlayer(player:Player):Observable<Player>{
    return this.http.put<Player>(this.baseUrl+"/players/"+player.id?.toString(),player)
  }
}
