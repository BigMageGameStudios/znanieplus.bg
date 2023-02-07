import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Environment } from 'src/globals/config';

@Component({
  selector: 'partner-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PartnerComponent {

  api_url = Environment.api_url;
  @Input('partner') partner;

  constructor() { }

}
