import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, inject, Inject, AfterViewInit, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProvider } from './providers';
import { WINDOW } from './modules/window';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../../stylesheets/application.scss']
})

export class AppComponent implements OnInit {

  change = inject(ChangeDetectorRef)
  userProvider = inject(UserProvider)

  subscription!: Subscription;
  cookiePolicy = !this.userProvider.getPolicy();

  constructor(
    private location: Location,
    @Inject(WINDOW) private window: Window,
  ) {
    this.setStatusBar();
    App.addListener('backButton', (event) => {
      if (event.canGoBack) {
        return this.location.back();
      }
      App.exitApp();
    })
  }

  async setStatusBar() {
    try {
      Promise.all([
        StatusBar.setStyle({ style: Style.Light }),
        StatusBar.setBackgroundColor({
          color: 'white'
        }),
        StatusBar.show()
      ]);

    } catch (e) {
      console.error(e);
    }

  }

  ngOnInit() {
    SplashScreen.hide();
  }

  accept() {
    this.cookiePolicy = false;
    this.userProvider.acceptPolicy();
    this.change.markForCheck();
  }

}
