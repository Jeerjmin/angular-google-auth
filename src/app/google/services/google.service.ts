import {Injectable, NgZone} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, from, Subject} from 'rxjs';
import {SnackBarService} from '../../shared/services/snack-bar.service';
import GoogleUser = gapi.auth2.GoogleUser;
import { Router} from '@angular/router';
import File = gapi.client.drive.File;

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(
    private snackBarService: SnackBarService,
    private router: Router,
    private ngZone: NgZone,
  ) {}

  private nextPageToken;

  public gapiSetup = false;
  public files: BehaviorSubject<File[]> = new BehaviorSubject([]);
  public isFetching: Subject<boolean> = new Subject();

  async initClient(): Promise<void> {
    const pload = new Promise((resolve) => {
      gapi.load('client:auth2', resolve);
    });

    return pload.then(async () => {
      await gapi.client
        .init({
          clientId: environment.GOOGLE_CLIENT_ID,
          discoveryDocs: environment.DISCOVERY_DOCS,
          scope: environment.SCOPES
        })
        .then((auth) => {
          this.gapiSetup = true;
        });
    });
  }

  public initAuthorize() {
    from(gapi.auth2.getAuthInstance().signIn())
      .subscribe(
        (user: GoogleUser) => {
          this.ngZone.run(() => this.snackBarService.openSnackBar('Авторизация прошла успешно'));
          this.ngZone.run(() => this.router.navigate(['/home']));
        },
        (error) => {
          this.ngZone.run(() => this.snackBarService.openSnackBar('Ошибка авторизации'));
          console.log(error);
        },
      );
  }

  public listFiles() {
    this.isFetching.next(true);
    from(gapi.client.drive.files.list({
      pageSize: 10,
      pageToken: this.nextPageToken
    }))
      .subscribe(
        (response) => {
          this.nextPageToken = response.result.nextPageToken;
          this.files.next(this.files.getValue().concat(response.result.files));
          this.ngZone.run(() => this.snackBarService.openSnackBar('Загрузка файлов прошла успешно') );
        },
        (error) => {
          this.ngZone.run(() => this.snackBarService.openSnackBar('Ошибка загрузки файлов'));
          console.log(error);
        },
        () => {
          this.isFetching.next(false);
        }
      );
  }
}
