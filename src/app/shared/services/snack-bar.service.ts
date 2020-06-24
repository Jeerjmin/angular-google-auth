import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    public snackBar: MatSnackBar
  ) {
  }

  public openSnackBar(message: string, action: string = null) {
      this.snackBar.open(message, action, {
        duration: 500,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
  }
}
