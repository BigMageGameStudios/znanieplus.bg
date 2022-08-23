import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { UpdateProvider } from './providers/UpdateProvider';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../../stylesheets/application.scss']
})

export class AppComponent {

  constructor(
    private UpdateProvider: UpdateProvider
  ) { }

}
