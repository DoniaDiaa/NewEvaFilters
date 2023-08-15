import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private img = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }
  getimgcapture(): BehaviorSubject<any> {
    return this.img;
  }
  setimagecapture(img: any): void {
    this.img.next(img);
  }

  downloadFile(fileUrl: any): Observable<any> {
    return this.http.get(fileUrl, {
      responseType: 'blob',
    });
  }
}
