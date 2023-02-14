import { Component, ChangeDetectionStrategy, HostListener, ChangeDetectorRef, AfterViewInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WINDOW } from '../modules/window';
import { UserProvider } from '../providers';
import { fadeAnimation } from '../helpers/animations';

@Component({
  selector: 'main-page',
  styleUrls: ['style.scss'],
  animations: [fadeAnimation],
  templateUrl: 'index.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainComponent implements AfterViewInit, OnDestroy {

  active = false;
  activeRoute = 'home';

  navigation = [
    {
      name: "this.translations['navigation']",
      children: [
        {
          name: "this.translations['orders']",
          link: '/admin/panel/orders',
          image: './assets/tracking.svg',
          type: 'link'
        },
        {
          name: "this.translations['categories']",
          link: '/admin/panel/categories',
          image: './assets/categories.svg',
          type: 'link'
        }
      ]
    }
  ]

  constructor(
    public userProvider: UserProvider,
    private change: ChangeDetectorRef,
    private ActivatedRoute: ActivatedRoute,
    @Inject(WINDOW) private window: Window
  ) { }

  ngOnInit() {
    this.ActivatedRoute.fragment.subscribe((data) => {
      this.activeRoute = data;
      this.change.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy(): void {
    this.window.removeEventListener('scroll', this.scroll);
  }

  scroll = () => {
    const height = this.window.scrollY;

    if (height > this.getHeight() && !this.active) {
      this.active = true;
      this.change.markForCheck();
    }

    if (height <= this.getHeight() && this.active) {
      this.active = false;
      this.change.markForCheck();
    }
  }

  getHeight() {
    if (this.window.screen.width < 800) {
      return 64;
    }
    return 84;
  }

  removeFragment() {
    this.activeRoute = null;
    this.change.markForCheck();
  }

  getDate() {
    const date = new Date();
    return date.getFullYear();
  }

}
