import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { thru } from 'lodash';
import { IFilterDetails } from '../models/Filters';
import { FiltersArray } from '../models/filtersArray';

@Injectable({
  providedIn: 'root'
})
export class FilterDetailsService {
  baseURL:string='https://imagefilter-be.azurewebsites.net';

  constructor(private http:HttpClient) { }
  filters:FiltersArray[]=[];

      public getAll(){
        return this.http.get<IFilterDetails>(`${this.baseURL}/api/ImageFilters/GetPublishedImageFilters`,{
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '{}').token}`
            }})
      }
//     getFilters(){
//   this.filters=this.getAll();
// }
}



