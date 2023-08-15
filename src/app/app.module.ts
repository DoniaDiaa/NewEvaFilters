import { BrowserModule, Meta } from
    '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from
    '@angular/common/http';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { WebcamModule } from 'ngx-webcam';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { FaceDetectComponent } from './face-detect/face-detect.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import { FilterComponent } from './filter/filter.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LoginComponent } from './login/login.component';
import { NewadmintoolComponent } from './newadmintool/newadmintool.component';
import { TestComponent } from './test/test.component';
import { UserToolComponent } from './userTool/userTool.component';





@NgModule({
  declarations: [	
    AppComponent,
    ImageUploaderComponent,
    HeaderComponent,
    NotFoundComponentComponent,
    VideoPlayerComponent,
    FaceDetectComponent,
    FilterComponent,
    LoginComponent,
    NewadmintoolComponent,
    TestComponent,
      UserToolComponent
   ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule,
    WebcamModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatMenuModule,
    ImageCropperModule

  ],exports: [

    MatInputModule,
    MatFormFieldModule,
    MatLabel,
    MatFormField,
    MatMenuModule

],
  providers: [Meta],
  bootstrap: [AppComponent]
})

export class AppModule { }
