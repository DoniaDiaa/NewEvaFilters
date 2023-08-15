import { Injectable, EventEmitter } from '@angular/core';
import * as faceapi from 'face-api.js';

@Injectable({
  providedIn: 'root',
})
export class FaceApiService {
  public globalFace: any;

 modelsPath = '/assets/models/';


  faceapi = require("face-api.js");


  private modelsForLoad = [
    faceapi.nets.ssdMobilenetv1.loadFromUri(this.modelsPath),
    faceapi.nets.faceLandmark68Net.loadFromUri(this.modelsPath),
    faceapi.nets.faceRecognitionNet.loadFromUri(this.modelsPath),
    faceapi.nets.faceExpressionNet.loadFromUri(this.modelsPath),
  ];

  cbModels: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.globalFace = faceapi;
    this.LoadModels();
  }

  private getModelsPath(): string {
    const baseHref = document.querySelector('base')?.getAttribute('href');
    return `${baseHref}assets/models`;
  }

  public LoadModels = () => {
    Promise.all(this.modelsForLoad)
      .then(res => {
        this.cbModels.emit(true);
        console.log('Models loaded...');
      });
  };
}
