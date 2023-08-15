import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Input } from '@angular/core';
import { ImagesService } from '../Services/images.service';
import { FilterDetailsService } from '../Services/filter-details.service';
import { IFilterDetails } from '../models/Filters';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { toInteger } from 'lodash';
import { Meta, Title } from '@angular/platform-browser';
import { FiltersArray } from '../models/filtersArray';
import { ImageCroppedEvent } from 'ngx-image-cropper';



@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})

export class ImageUploaderComponent implements OnInit {

  constructor(private images:ImagesService,private filter:FilterDetailsService,private modalService: NgbModal,private titleService: Title, private metaService: Meta) { }
  button:any=document.createElement("button");
  img6:any = null;
   flag1 = true;
   flag2=true;
  humanimg:any=null;
  imgChangeEvt: any = '';
  cropImgPreview: any = '';
   x : FiltersArray={
    id: 100,
    imageFilterUrl: '../../assets/filter10.png',
    statusId: 1,
    originalFileName: 'filter10'
  }
   y : FiltersArray={
    id: 101,
    imageFilterUrl: '../../assets/filter11.png',
    statusId: 1,
    originalFileName: 'filter11'
  }
   z : FiltersArray={
    id: 102,
    imageFilterUrl: '../../assets/filter12.png',
    statusId: 1,
    originalFileName: 'filter12'
  }
  onFileChange(event: any): void {
    this.imgChangeEvt = event;
    console.log(event);
    
  }
  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
    
    
  }
  imgLoad() {
    // display cropper tool
    console.log('imgLoad');
    
  }

  initCropper() {
    // init cropper
console.log('initCropper');

  }

  imgFailed() {
    // error msg
    console.log('imgFailed');
    
  }
  filters:FiltersArray[]=[];
  ngOnInit(): void {

    this.titleService.setTitle("Eva Filters"); 
    this.metaService.addTags([
      { name: 'keywords', content: 'Eva Filters, Eva Pharma,Filters' },
      { name: 'description', content: 'Eva Filters to add our friendly filters tot your image' },
      { name: 'subject', content: 'Eva Filters' },
      { name: 'copyright', content: 'Eva Pharma' },
      { name:'language', content:'ES'},
      { name:'robots', content:'All'},
      { name:'revised', content:'Thursday, September 15th, 2022, 08:00 pm'},
      { name:'target', content:'all'},
      { name:'HandheldFriendly', content:'True'},
      { name:'og:title', content:'Eva Filters'},
      { name:'og:type', content:'website'},
      { name:'og:url', content:'https://www.EvaFilters.com'},
      { name:'og:image', content:'https://upload.wikimedia.org/wikipedia/ar/d/da/%D8%B4%D8%B9%D8%A7%D8%B1_%D8%B4%D8%B1%D9%83%D8%A9_%D8%A5%D9%8A%D9%81%D8%A7_%D9%81%D8%A7%D8%B1%D9%85%D8%A7.png'},
      { name:'og:site_name', content:'Eva Filters'},
      { name:'og:email', content:'info@evapharma.com'},
      { name:'og:phone_number', content:'+20 123 456 7890'},


      
      

    ]);


this.filter.getAll().subscribe({
      next:(data) =>{
       


        console.log(data);
        this.filters=data.data.items;
        console.log(this.filters);
        this.filter.filters=data.data.items;
        

        
      }
    });
    this.filters=this.filters
    
    this.images.getimgcapture().subscribe({
      next: (nextimg) => {
        if(nextimg){
        this.humanimg=nextimg.src;
        let img1 :any= document.getElementById('img1');
        img1.src=nextimg.src;
        // this.imgChangeEvt = nextimg.toDataURL();

        }
        
        
      },
      
      complete: () => {
        console.log("Observable Died");
      }
    });
  }


  imgname:string='';
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
  }
  
  drawimg():void{
    let img1 :any= document.getElementById('img1');
    console.log(img1);
    let img2 :any= document.getElementById('img2');
    console.log(img2);
    img2.imageSmoothingQuality = "high";
    img2.imageSmoothingEnabled = true;
    img1.imageSmoothingQuality = "high";
    img1.imageSmoothingEnabled = true;
    var canvas2 = <HTMLCanvasElement>document.createElement('canvas');
    canvas2.width=img2.width;
    canvas2.height=img2.height;
    // img2.crossOrigin = "Anonymous";
    let ctx2:any = canvas2.getContext("2d");
    ctx2.drawImage(img2,0,0);
   // resample_single(canvas2, img1.width, img1.height, true);
    let canvas =<HTMLCanvasElement>document.createElement('canvas');
    canvas.id="myCanvas";
    let ctx:any = canvas.getContext("2d");
    canvas.width=img1.width;
    canvas.height=img1.height;
    
    canvas.style.maxWidth='100%'
    ctx.drawImage(img1, 0, 0);
    ctx.drawImage(canvas2,0,0,img1.width,img1.height);
    let imgcont:any=document.getElementById("canvas-container");
    imgcont.innerHTML='';
    imgcont.appendChild(canvas);
  }
  getimage(event:Event):void {
    console.log(event);
    let img1 :any= document.getElementById('img1');
    let img5 :any= document.createElement('img');
    console.log(img5);
    this.imgChangeEvt = event;
    console.log(this.imgChangeEvt);
    

    // img5.style.maxWidth="100%";
    const result:any = (event.target as HTMLInputElement).files;
    // img1.src=window.URL.createObjectURL(result[0]);
    img5.src=window.URL.createObjectURL(result[0]);
    this.imgname=result[0].name;
    console.log(result);
    img5.style.maxWidth='100%';
    let imgcont:any=document.getElementById("canvas-container");
    imgcont.innerHTML='';
    img5.setAttribute("style", "display:block");
    img5.setAttribute("style", "max-width:100%");
    this.flag2=true;
    // imgcont.append(img5);
  };

  // getimg(e:Event):void{
  //   let img2 :any= document.getElementById('img2');
  //   let img4 :any= document.getElementById('img4');
  //   const result:any = (e.target as HTMLInputElement).src;
  //   img2.src=(result);
  //   img4.src=(result);
  //   console.log(result);
  // }
  clickFilter(e:Event):void{
    console.log(e);
    let img2 :any= document.getElementById('img2');
    let img4 :any= document.getElementById('img4');
    const result:any = (e.target as HTMLInputElement).src;
    img2.src=(result);
    img4.src=(result);
    console.log(result);
    this.drawimg();
    this.showDownload();
   
    
  }
  showDownload():void{
    if(document.getElementById("myCanvas")){
      console.log(document.getElementById("myCanvas"));
     this.flag2=false;
    }
  }
  download(){
    var canvas :any= document.getElementById("myCanvas");
    var gh = canvas.toDataURL('png');
    var a  = document.createElement('a');
    a.href = gh;
    a.download = 'image.png';
    a.click();
  }
  sendmail(){
  let canvas:any= document.getElementById("myCanvas");
  let email=document.getElementById("email");
  canvas.toDataURL('image/png');
  //call api
  
  }

  
  // getimgg(e:Event):void{
  //   let img1 :any= document.getElementById('img1');
    
  //   const result:any = (e.target as HTMLInputElement).src;
  //   img1.src=(result);
   
  //   console.log(result);
  // }

  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  btnLabel: string = 'Capture image';

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  // snapshot(event: any) {
  //   console.log(event);
  //   this.previewImage = event.imageAsDataUrl;
  //   this.btnLabel = 'Re capture image'
  //   this.status= 'Image Taken Successfully'
  //   let img :any= document.getElementById('img1');
  //   let img5 :any= document.getElementById('img5');
  //   console.log('humanimg');
    
  //   const result:any = event.imageAsDataUrl;
  //   img.src=(result);
  //   img5.src=(result);
  //   this.stream=null
    
  //   console.log(result);
  // }
  checkPermissions() {
    
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    }).then((res) => {
      console.log("response", res);
      console.log( navigator.mediaDevices.getSupportedConstraints());
      
      this.stream = res;
      this.status = 'My camera is accessing';
      this.btnLabel = 'Capture image';
    }).catch(err => {
      console.log(err);
      if(err?.message === 'Permission denied') {
        this.status = 'Permission denied please try again by approving the access';
      } else {
        this.status = 'You may not having camera system, Please try again ...';
      }
    })
  }

  captureImage(e:Event) {
    console.log(e);
    
      this.trigger.next();
      
  }

  proceed() {
    console.log(this.previewImage);
  }
}




  
  
  
  

  
 




//  function resample_single(canvas:HTMLCanvasElement, width:number, height:number, resize_canvas:boolean) {
//   var width_source = canvas.width;
//   var height_source = canvas.height;
//   width = Math.round(width);
//   height = Math.round(height);

//   var ratio_w = width_source / width;
//   var ratio_h = height_source / height;
//   var ratio_w_half = Math.ceil(ratio_w / 2);
//   var ratio_h_half = Math.ceil(ratio_h / 2);

//   var ctx:any = canvas.getContext("2d");
//   var img = ctx.getImageData(0, 0, width_source, height_source);
//   var img2 = ctx.createImageData(width, height);
//   var data = img.data;
//   var data2 = img2.data;

//   for (var j = 0; j < height; j++) {
//     for (var i = 0; i < width; i++) {
//       var x2 = (i + j * width) * 4;
//       var weight = 0;
//       var weights = 0;
//       var weights_alpha = 0;
//       var gx_r = 0;
//       var gx_g = 0;
//       var gx_b = 0;
//       var gx_a = 0;
//       var center_y = (j + 0.5) * ratio_h;
//       var yy_start = Math.floor(j * ratio_h);
//       var yy_stop = Math.ceil((j + 1) * ratio_h);
//       for (var yy = yy_start; yy < yy_stop; yy++) {
//         var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
//         var center_x = (i + 0.5) * ratio_w;
//         var w0 = dy * dy; //pre-calc part of w
//         var xx_start = Math.floor(i * ratio_w);
//         var xx_stop = Math.ceil((i + 1) * ratio_w);
//         for (var xx = xx_start; xx < xx_stop; xx++) {
//           var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
//           var w = Math.sqrt(w0 + dx * dx);
//           if (w >= 1) {
//             //pixel too far
//             continue;
//           }
//           //hermite filter
//           weight = 2 * w * w * w - 3 * w * w + 1;
//           var pos_x = 4 * (xx + yy * width_source);
//           //alpha
//           gx_a += weight * data[pos_x + 3];
//           weights_alpha += weight;
//           //colors
//           if (data[pos_x + 3] < 255)
//             weight = weight * data[pos_x + 3] / 250;
//           gx_r += weight * data[pos_x];
//           gx_g += weight * data[pos_x + 1];
//           gx_b += weight * data[pos_x + 2];
//           weights += weight;
//         }
//       }
//       data2[x2] = gx_r / weights;
//       data2[x2 + 1] = gx_g / weights;
//       data2[x2 + 2] = gx_b / weights;
//       data2[x2 + 3] = gx_a / weights_alpha;
//     }
//   }
//   //clear and resize canvas
//   if (resize_canvas === true) {
//     canvas.width = width;
//     canvas.height = height;
//   } else {
//     ctx.clearRect(0, 0, width_source, height_source);
//   }

//   //draw
//   ctx.putImageData(img2, 0, 0);


//  }

