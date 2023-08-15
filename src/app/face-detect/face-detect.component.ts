import { Component, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FaceApiService } from '../Services/face-api.service';
import { VideoPlayerService } from '../Services/video-player.service';
import * as _ from 'lodash';
import { ImagesService } from '../Services/images.service';
@Component({
  selector: 'app-face-detect',
  templateUrl: './face-detect.component.html',
  styleUrls: ['./face-detect.component.scss']
})
export class FaceDetectComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  public currentStream: any;
  public dimensionVideo: any;
  listEvents: Array<any> = [];
  overCanvas: any;
  listExpressions: any = [];

  constructor(
    private faceApiService: FaceApiService,
    private videoPlayerService: VideoPlayerService,
    private images:ImagesService,
    private renderer2: Renderer2,
    private elementRef: ElementRef
    ) {}

  ngOnInit(): void {
    this.listenerEvents();
    this.checkMediaSource();
    this.getSizeCam();
  }

  ngOnDestroy(): void {
    this.listEvents.forEach(event => event.unsubscribe());
  }

  listenerEvents = () => {
    const observer1$ = this.videoPlayerService.cbAi
      .subscribe(({resizedDetections, displaySize, expressions, videoElement}) => {
        resizedDetections = resizedDetections || null;
        // :TODO Aqui pintamos! dibujamos!
        if (resizedDetections) {
          this.listExpressions = _.map(expressions, (value: any, name: any) => {
            return {name, value};
          });
          // this.createCanvasPreview(videoElement);
          this.drawFace(resizedDetections, displaySize);
          
        }
        
          
            for (var face of resizedDetections) {
              console.log(resizedDetections)
              if(face.expressions.happy > 0.9){
                console.log(face.expressions.happy);
            let canvas = document.createElement('canvas');
                canvas.width = videoElement.nativeElement.videoWidth;
                canvas.height = videoElement.nativeElement.videoHeight;
                let ctx:any = canvas.getContext("2d");
                
               ctx.drawImage(videoElement.nativeElement, 0, 0);
                var img=new Image();
                img.src = canvas.toDataURL();
                img.id='img6';
                let imgcont:any=document.getElementById('screenshot');
                imgcont.innerHTML = ''
                imgcont.appendChild(img)
                this.images.setimagecapture(img);
                this.currentStream=null;
                console.log(this.currentStream);
              }
         }
            
                
                        }
      
        
      );

    this.listEvents = [observer1$];
    
  };

  drawFace = (resizedDetections: any, displaySize: { width: any; height: any; }) => {
    if (this.overCanvas) {
      const {globalFace} = this.faceApiService;
      this.overCanvas.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height);

    }
  };
  triggerstream(){
    
    navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: true,
        })
        .then((stream) => this.currentStream = stream)
  }

  checkMediaSource = () => {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: true,
        })
        .then((stream) => this.currentStream = stream)
        .catch((error) => {
          console.log('Error no permissions');
        });
    } else {
      console.info('Error not media found');
    }
  };

  getSizeCam = () => {
    const elementCam: any = document.querySelector('.cam');
    const { width, height } = elementCam.getBoundingClientRect();
    console.log('width: ',width, 'height:' , height);
    this.dimensionVideo = { width, height };
  }

  // createCanvasPreview = (videoElement: any) => {
  //   if (!this.overCanvas) {
  //     const {globalFace} = this.faceApiService;
  //     this.overCanvas = globalFace.createCanvasFromMedia(videoElement.nativeElement);
  //     this.renderer2.setProperty(this.overCanvas, 'id', 'new-canvas-preview');
  //     const elementPreview = document.querySelector('.canvas-preview');
  //     this.renderer2.appendChild(elementPreview, this.overCanvas);
  //   }
  // };

}


