import { Component, Input, ChangeDetectorRef, ViewChild, ElementRef, HostListener, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { DrawerComponent } from 'src/app/shared/drawer-component';
import { MapProvider, UserProvider } from 'src/app/providers';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'toolbar-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarComponent implements OnInit, OnDestroy {

  subscription!: Subscription;

  active = false;
  user = this.mapProvider.get(MapProvider.USER);

  @Input('menus') menus!: IObjectKeys[];

  @Input('drawer') drawer!: DrawerComponent;
  @Output('onSelect') onSelect = new EventEmitter();

  @ViewChild('menu', { static: true }) menu!: ElementRef;

  translations: { [key: string]: string | Function | any } = this.activated.snapshot.data.translations;

  constructor(
    private router: Router,
    private mapProvider: MapProvider,
    private activated: ActivatedRoute,
    private change: ChangeDetectorRef,
    private userProvider: UserProvider,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  get email() {
    return 'email';
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.subscription = this.drawer.toogleEvent.subscribe(() => {
        this.change.markForCheck();
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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

  logout() {
    // this.userProvider.logout();
    this.router.navigateByUrl('/');
    this.toggleMenu();
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: MouseEvent) {

    const clickedInside = this.menu.nativeElement.contains(targetElement);
    if (!clickedInside && this.active) {
      this.toggleMenu();
    }

  }

  refresh(){
    this.change.markForCheck();
  }

  trackByKey(index: number, item: IObjectKeys) {
    return item.key;
  }

}