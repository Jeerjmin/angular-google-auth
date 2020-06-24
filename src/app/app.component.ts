import { Component } from '@angular/core';
import {GoogleService} from './google/services/google.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private googleService: GoogleService
  ) {
  }
}
