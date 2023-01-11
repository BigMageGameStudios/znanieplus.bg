import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'error-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErrorPage {

  constructor() {}

}