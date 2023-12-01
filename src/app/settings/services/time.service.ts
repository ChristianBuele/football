import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { map,catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private baseUrl:string=environment.baseUrl;
  constructor(private http:HttpClient ) { }

  postTimeEvent(data:any){
    return this.http.post(this.baseUrl+'/matches/time',data).pipe(
      map(
        data=>{
          return {
            ok:true,
            msg:"Tiempo Actualizado"
          };
        }
      ),
      catchError(
        error =>{
          return of(
            {
              ok:false,
              msg:"No se puso actualizar el tiempo"
            }
          );
        }
      )
    );
  }
}
