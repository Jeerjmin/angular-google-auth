import {Component, ChangeDetectionStrategy} from '@angular/core';
import {GoogleService} from '../services/google.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginPageComponent {

  constructor(
    private googleService: GoogleService,
  ) {
    this.googleService.initClient();
  }

  handleAuthenticate() {
    this.googleService.initAuthorize();
  }
}
