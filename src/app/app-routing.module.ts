import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { TestComponent } from './test/test.component';
import { UserToolComponent } from './userTool/userTool.component';
import { NewadmintoolComponent } from './newadmintool/newadmintool.component';

const routes: Routes = [ {
  path: '',
  component: UserToolComponent
},
{
  path:'admin',
  component: LoginComponent
},
{
  path:'test',
  component:TestComponent
},
{
  path:'addFilter',
  component:NewadmintoolComponent
},

{
  path: '**',
  component: NotFoundComponentComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
