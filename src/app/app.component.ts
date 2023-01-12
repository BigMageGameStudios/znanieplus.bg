import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Subscription } from 'rxjs';
import { WINDOW } from './modules/window';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../../stylesheets/application.scss']
})

export class AppComponent {

  subscription!: Subscription;

  constructor(
    private SwUpdate: SwUpdate,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && this.SwUpdate.isEnabled) {

      this.subscription = this.SwUpdate.versionUpdates.subscribe((event) => {
        switch (event.type) {
          case ('VERSION_READY'): {
            this.window.location.reload();
            break;
          }
        }

      });

    }
  }

}
