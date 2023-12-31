import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FaceApiService } from '../Services/face-api.service';
import { VideoPlayerService } from '../Services/video-player.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @Input() stream: any;
  @Input() width: any;
  @Input() height: any;

  @ViewChild('videoElement') videoElement: any;

  listEvents: Array<any> = [];
  modelsReady: boolean = false;
  overCanvas: any;

  filters = [{
    type: 'image',
    image: 'sunglass.png'
  }, {
    type: 'image',
    image: 'sunglass-2.png'
  }]
 
 
  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private faceApiService: FaceApiService,
    private videoPlayerService: VideoPlayerService
  ) {}

  ngOnInit(): void {
    this.listenerEvents();
  }

  listenerEvents = () => {
    const observer1$ = this.faceApiService.cbModels.subscribe((res) => {
      console.log(`sbModels: ${res}`);
      this.modelsReady = true;
      this.checkFace();
    });

    const observer2$ = this.videoPlayerService.cbAi.subscribe(
      ({ resizedDetections, displaySize, expressions, eyes }) => {
        resizedDetections = resizedDetections[0] || null;
        if (resizedDetections) {
          this.drawFace(resizedDetections, displaySize, eyes);
        }
      }
    );
    this.listEvents = [observer1$, observer2$];
  };

  drawFace = (resizedDetections: any, displaySize: { width: number; height: any; }, eyes: any) => {
    const { globalFace } = this.faceApiService;
    this.overCanvas
      .getContext('2d')
      .clearRect(0, 0, displaySize.width, displaySize.height);



    const scale = this.width / displaySize.width;
    console.log(scale);

    // const elementFilterEye = document.querySelector('.filter-eye');
    // this.renderer2.setStyle(elementFilterEye, 'left', `${eyes.left[0].x * scale}px`);
    // this.renderer2.setStyle(elementFilterEye, 'top', `${eyes.left[0].y * scale}px`);
  };


  checkFace = () => {
    let intervalId:any =
    setInterval(async () => {
      if(this.videoElement){
        await this.videoPlayerService.getLandMark(this.videoElement);
      }
      else{
        this.stream=null;
      }
      
    }, 1000);
  };
  

  loadedMetaData(): void {
    this.videoElement.nativeElement.play();
  }

  listenerPlay(): void {
    const { globalFace } = this.faceApiService;
    this.overCanvas = globalFace.createCanvas(
      this.videoElement.nativeElement
    );
    this.renderer2.setProperty(this.overCanvas, 'id', 'new-canvas-over');
    this.renderer2.setStyle(this.overCanvas, 'width', `${this.width}px`);
    this.renderer2.setStyle(this.overCanvas, 'height', `${this.height}px`);
    this.renderer2.appendChild(this.elementRef.nativeElement, this.overCanvas);
  }

  ngOnDestroy(): void {
    this.listEvents.forEach((event) => event.unsubscribe());
  }
}
