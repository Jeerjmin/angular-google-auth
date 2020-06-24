import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page.component';
import { GoogleRoutingModule } from './google-routing.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    GoogleRoutingModule,
    CommonModule,
  ]
})
export class GoogleModule { }
