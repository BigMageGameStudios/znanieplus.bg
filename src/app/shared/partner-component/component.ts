import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Environment } from 'src/globals/config';
import {IObjectKeys} from "../../helpers/interfaces";

@Component({
  selector: 'partner-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PartnerComponent {

  api_url = Environment.images_url;
  @Input('partner') partner;
  @Input() onClick: (partner: IObjectKeys) => void;

  constructor() { }
  onPress () {
    this.onClick(this.partner);
  }

}
