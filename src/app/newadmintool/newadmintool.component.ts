import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterToAddDetails } from '../models/FilterToAdd';
import { IFilterDetails } from '../models/Filters';
import { FiltersArray } from '../models/filtersArray';
import { FilterDetailsService } from '../Services/filter-detailss.service ';
import { FilterToEditDetails } from '../models/FilterToEdit';
import { FilterToDeActiveDetails } from '../models/FilterToDelete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-newadmintool',
  templateUrl: './newadmintool.component.html',
  styleUrls: ['./newadmintool.component.css']
})
export class NewadmintoolComponent implements OnInit {

  filters:FiltersArray[]=[];
  file:File | any;
  filename:string='';
  filtertoadd:FilterToAddDetails={
    StatusName: true,
    ImageFilterUrl: "",
    name: ''
  }
  filtertoedit:FilterToEditDetails={
    Id: 0,
    ImageFilterUrl: undefined,
    OriginalFileName: '',
    StatusName: false
  }
  filtertodelete:FilterToDeActiveDetails={
    id: 0
  }
  imgname:string='';
  isShowDiv = false;
  flag:boolean=false;

  constructor(private filter:FilterDetailsService) { }

  ngOnInit(): void {

    this.filter.getAll().subscribe({
      next:(data) =>{
        console.log(data)
        this.filters=data.data.items;
        console.log(this.filters);
        this.filter.filters=data.data.items;
        console.log(this.filters);

      }
    });





  }
  clickFilter(e:Event):void{
  }
  onChange(event:Event){
    console.log(event);
    let img :any= document.getElementById('img1');
    // let img5 :any= document.getElementById('img5');
    const result:any = (event.target as HTMLInputElement).files;
    img.src=window.URL.createObjectURL(result[0]);
    this.file=result[0];
    this.filename=result[0].name
  }

  ApplyAdd(){
    this.filtertoadd.ImageFilterUrl=this.file;
    this.filtertoadd.name=this.filename;

    let isTrueSet = (this.form.value.active === "true");
    this.filtertoadd.StatusName= isTrueSet;
    console.log(this.filtertoadd);
     this.filter.add(this.filtertoadd).subscribe({
      next:(data) =>{
        console.log(data);

      }
    });
  }
  ApplyEdit(event:Event):void {
    let isTrueSet = (this.form.value.active === "true");

    this.imgname=this.filename;
    this.filtertoedit.ImageFilterUrl=this.file;
    this.filtertoedit.StatusName= isTrueSet;
    this.filtertoedit.OriginalFileName=this.filename;
    console.log(this.filtertoedit);

    console.log(this.filtertoedit);

    this.filter.edit(this.filtertoedit).subscribe({
      next:(data) =>{
        console.log(data);

      }
    });
    this.flag=true;
  }
  form = new FormGroup({
    active: new FormControl('', Validators.required)
  });

  get f(){
    return this.form.controls;
  }

  submit(){
    // let img :any= document.getElementById('img1');
    // this.filtertoadd=img;
    // console.log(this.form.value);

    // let isTrueSet = (this.form.value.active === "true");
    // this.filtertoadd.active= isTrueSet;

    // const now = new Date();
    // this.filtertoadd.creationDate=now.toLocaleString();
    // console.log(this.filtertoadd);

    // send to api
  }
  Edit(filter:FiltersArray){
      this.flag=true;

      // this.isShowDiv=false;
      console.log("xd");
      let isTrueSet = (this.form.value.active === "true");
      console.log(isTrueSet);
      let img1 :any= document.getElementById('img1');
      console.log("xd");
      img1.src=filter.imageFilterUrl;
      console.log("xd");
      this.filtertoedit.Id=filter.id;
      this.filtertoedit.ImageFilterUrl=filter.imageFilterUrl;
      this.filtertoedit.OriginalFileName=filter.originalFileName;

      console.log("xd");



      //send filter to add to api


    }
  // }
  ToggleActivation(filter:FiltersArray){
    console.log(filter.id);

this.filtertodelete.id=filter.id;
console.log(this.filtertodelete);

this.filter.delete(this.filtertodelete).subscribe({
  next:(data) =>{
    console.log(data);

  }
});



      //delete filter to add to api


    }

  toggleDisplayDiv() {

    this.isShowDiv = !this.isShowDiv;
  }

}



