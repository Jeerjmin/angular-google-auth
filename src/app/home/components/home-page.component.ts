import {ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GoogleService} from '../../google/services/google.service';
import File = gapi.client.drive.File;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private router: Router,
    private googleService: GoogleService,
    private cdr: ChangeDetectorRef
  ) {}

  public lists: File[];
  public isFetching: boolean;

  ngOnInit() {
    this.googleService.listFiles();

    this.googleService.isFetching.subscribe(isFetching => {
        this.isFetching = isFetching;
        this.cdr.detectChanges();
    });

    this.googleService.files.subscribe((L) => {
      if (L.length !== 0) {
        this.lists = L;
        this.cdr.detectChanges();
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight && this.isFetching === false) {
      this.googleService.listFiles();
    }
  }

  handleFile(file: File) {
    const link = `https://drive.google.com/open?id=${file.id}`;
    window.open(link);
  }
}
