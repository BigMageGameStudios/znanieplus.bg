import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, OnInit, OnDestroy, Inject, PLATFORM_ID, ViewChild, ElementRef, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { DrawerComponent } from 'src/app/shared/drawer-component';
import { MapProvider, UserProvider } from 'src/app/providers';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { Subscription } from 'rxjs';
import { WINDOW } from 'src/app/modules/window';
import { MOBILE_WIDTH } from 'src/globals';

@Component({
  selector: 'toolbar-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarComponent implements OnInit, OnDestroy {

  subscription!: Subscription;

  private mapProvider = inject(MapProvider);
  private activated = inject(ActivatedRoute);
  private change = inject(ChangeDetectorRef);
  public userProvider = inject(UserProvider);

  private window: Window = inject(WINDOW);
  private platformId: Object = inject(PLATFORM_ID);

  active = false;
  activeScroll = false;
  activeRoute = 'home';
  user = this.mapProvider.get(MapProvider.USER);

  @Input('drawer') drawer!: DrawerComponent;

  @ViewChild('toolbar', { static: true }) toolbar: ElementRef<HTMLElement>;
  translations: { [key: string]: string | Function | any } = this.activated.snapshot.data.translations;

  constructor() { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.subscription = this.drawer.toogleEvent.subscribe(() => {
        this.change.markForCheck();
      });
      this.activated.fragment.subscribe((data) => {
        this.activeRoute = data;
        this.change.markForCheck();
      });
    }
  }

  ngAfterViewInit(): void {
    this.window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.window.removeEventListener('scroll', this.scroll);
  }

  scroll = () => {
    if (this.window.innerWidth > MOBILE_WIDTH) {
      const height = this.window.scrollY;

      if (height > this.getHeight() && !this.activeScroll) {
        this.activeScroll = true;
        this.toolbar.nativeElement.classList.add('scroll');
        this.change.markForCheck();
      }

      if (height <= this.getHeight() && this.activeScroll) {
        this.activeScroll = false;
        this.toolbar.nativeElement.classList.remove('scroll');
        this.change.markForCheck();
      }
    }
  }

  getHeight() {
    if (this.window.screen.width < MOBILE_WIDTH) {
      return 64;
    }
    return 84;
  }

  toggleMenu(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.active = !this.active;

    this.change.markForCheck();
  }

  toggleDrawer(event: Event) {
    if (this.active) {
      this.toggleMenu();
    }
    this.drawer.toggle(event);
  }

  removeFragment() {
    this.activeRoute = null;
    this.change.markForCheck();
  }

  trackByKey(index: number, item: IObjectKeys) {
    return item.key;
  }

}