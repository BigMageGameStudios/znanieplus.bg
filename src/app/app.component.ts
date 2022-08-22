import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UpdateProvider } from './providers/UpdateProvider';

@Component({
  selector: 'app-root',
  styleUrls: [],
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {

  constructor(
    private UpdateProvider: UpdateProvider
  ) { }

}
