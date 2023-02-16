import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
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

  subscription!: Subscription;
  cookiePolicy = !this.userProvider.getPolicy();

  constructor(
    private change: ChangeDetectorRef,
    private userProvider: UserProvider
  ) { }

  accept() {
    this.cookiePolicy = false;
    this.userProvider.acceptPolicy();
    this.change.markForCheck();
  }

}
