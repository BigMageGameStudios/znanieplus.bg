import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Environment } from 'src/globals';

@Component({
  selector: 'apartment-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ApartmentComponent {

  api_url = Environment.api_url;
  @Input('apartment') apartment;

  constructor() { }

}
