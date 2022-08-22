import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Environment } from 'src/globals/config';

@Component({
  selector: 'broker-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BrokerComponent {

  api_url = Environment.api_url;
  @Input('broker') broker;

  constructor() { }

}
