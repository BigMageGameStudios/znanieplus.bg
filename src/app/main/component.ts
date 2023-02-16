import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { fadeAnimation } from '../helpers/animations';

@Component({
  selector: 'main-page',
  styleUrls: ['style.scss'],
  animations: [fadeAnimation],
  templateUrl: 'index.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainComponent {

  constructor( ) { }

}
