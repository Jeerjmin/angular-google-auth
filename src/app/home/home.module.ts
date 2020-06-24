import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page.component';
import {HomeRoutingModule} from './home-routing.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    HomeRoutingModule,
    CommonModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ]
})
export class HomeModule { }
