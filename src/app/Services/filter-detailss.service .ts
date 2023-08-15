import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { thru } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { IFilterDetails } from '../models/Filters';
import { FilterToAddDetails } from '../models/FilterToAdd';
import { FilterToDeActiveDetails } from '../models/FilterToDelete';
import { FilterToEditDetails } from '../models/FilterToEdit';

@Injectable({
  providedIn: 'root'
})
export class FilterDetailsService {
  public currentUser =JSON.parse(localStorage.getItem('currentUser') || '{}').token;
  baseURL: string ='https://imagefilter-be.azurewebsites.net';
  constructor(private http:HttpClient) { }
  filters:IFilterDetails[]=[];
  private userId = new BehaviorSubject<number | null>(JSON.parse(localStorage.getItem('currentUser') || '{}').id);
  private userName =new BehaviorSubject<string |null>(JSON.parse(localStorage.getItem('currentUser') || '{}').name);
  public getAll(){
    return this.http.get<IFilterDetails>(`${this.baseURL}/api/ImageFilters/GetAllImageFilters`,{
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '{}').token}`
        }})
  }
  public add(filtertoadd:FilterToAddDetails){
    console.log(filtertoadd);
    let testData:FormData = new FormData();
testData.append('image',filtertoadd.ImageFilterUrl, filtertoadd.name);
    return this.http.post(`${this.baseURL}/api/ImageFilters/AddImageFilter`,testData,{
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '{}').token}`
        }})
//     {
//       params:{StatusName:filtertoadd.StatusName}
// })
  }
  public edit(filtertoedit:FilterToEditDetails){
    let testData:FormData = new FormData();
    testData.append("Id",filtertoedit.Id.toString());
    testData.append("OriginalFilename", filtertoedit.OriginalFileName);
    testData.append("StatusName",filtertoedit.StatusName.toString());


    return this.http.put(`${this.baseURL}/api/ImageFilters/EditImageFilter`,testData,{


      // params:{
      //   Id:filtertoedit.Id,
      //   OriginalFileName:filtertoedit.OriginalFileName,
      //   StatusName:filtertoedit.StatusName
      // },
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '{}').token}`
        }}
    )
  }
  public delete(filtertodelete:FilterToDeActiveDetails){
    return this.http.delete(`${this.baseURL}/api/ImageFilters/DeActivateImageFilter?id=${filtertodelete.id}`,{
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '{}').token}`
        }}
      // params:{Id:filtertodelete.id}
    )
  }

// getFilters(){
//   this.filters=this.getAll();
// }

}
