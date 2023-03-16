import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'',
    loadChildren:()=>import('./modules/courses/courses.module').then(m=>m.CoursesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
