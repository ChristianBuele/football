import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { CategoriesResponse } from 'src/app/model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private baseUrl:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getAllCategories():Observable<CategoriesResponse>{
    return this.http.get<CategoriesResponse>(this.baseUrl+"/categories");
  }
}
