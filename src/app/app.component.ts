import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProvider } from './providers';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../../stylesheets/application.scss']
})

export class AppComponent {

  change = inject(ChangeDetectorRef)
  userProvider = inject(UserProvider)

  subscription!: Subscription;
  cookiePolicy = !this.userProvider.getPolicy();

  constructor() { }

  accept() {
    this.cookiePolicy = false;
    this.userProvider.acceptPolicy();
    this.change.markForCheck();
  }

}
