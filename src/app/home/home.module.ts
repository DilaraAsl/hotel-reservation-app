import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ], // we have to export the Home component so that reservation module can use it
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
