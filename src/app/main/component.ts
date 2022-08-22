import { Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'main-page',
  styleUrls: ['style.scss'],
  templateUrl: 'index.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainComponent {

  active = false;
  activeRoute = 'home';
  url = '/';

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private Router: Router
  ) { }

  ngOnInit() {
    this.ActivatedRoute.fragment.subscribe((data) => {
      if (this.url == this.Router.url) {
        return this.activeRoute = 'home';
      }
      this.activeRoute = data;
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

  getDate() {
    const date = new Date();
    return date.getFullYear();
  }

}
