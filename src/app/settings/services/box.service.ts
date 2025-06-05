import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { map, Observable } from 'rxjs';
import { BoxModel } from 'src/app/model/box.mode';

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  private baseUrl:string=environment.baseUrl;

  private http:HttpClient = inject(HttpClient);
  constructor() { }

  getAllBoxes():Observable<BoxModel[]>{
    return this.http.get<any>(this.baseUrl+"/boxes").pipe(
      map(resp=>{
          return resp.categories;
      })
    );
  }
  getBoxById(id:number):Observable<BoxModel>{
    return this.http.get<any>(this.baseUrl+"/boxes/"+id).pipe(
      map(resp=>{
          return resp.pelea;
      })
    );
  }
}
