import { Component, ChangeDetectionStrategy, HostListener, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProvider } from '../providers';

@Component({
  selector: 'main-page',
  styleUrls: ['style.scss'],
  templateUrl: 'index.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainComponent {

  active = false;
  activeRoute = 'home';

  constructor(
    private change: ChangeDetectorRef,
    public userProvider: UserProvider,
    private ActivatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.ActivatedRoute.fragment.subscribe((data) => {
      this.activeRoute = data;
      this.change.markForCheck();
    });
  }

  @HostListener("window:scroll", ['$event']) onWindowScroll(event) {
    const height = window.pageYOffset;
    if (height > 100) {
      this.active = true;
    } else {
      this.active = false;
    }
  }
  
  removeFragment(){
    this.activeRoute = null;
    this.change.markForCheck();
  }

  getDate() {
    const date = new Date();
    return date.getFullYear();
  }

}
