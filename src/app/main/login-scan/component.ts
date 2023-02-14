import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { SEOProvider, UserProvider } from 'src/app/providers';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog';
import { CardProvider } from '../providers';

@Component({
  selector: 'login-scan-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginPage implements OnInit, OnDestroy {

  scanner: Html5Qrcode;
  timeOut: any;
  timeOutReset

  code = '';
  canScan = true;
  active = false;
  submited = false;
  timeout = 1000;
  timeOutResetValue = 5000;

  constructor(
    private router: Router,
    private card: CardProvider,
    private dialog: MatDialog,
    private SEOProvider: SEOProvider,
    private change: ChangeDetectorRef,
    private userProvider: UserProvider,
    @Inject(PLATFORM_ID) private platform: Object
  ) {
    this.SEOProvider.set({
      title: 'ЗНАНИЕ+ | Вход',
      description: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      keywords: 'знание,карта,отстъпка,култура,социална придобивка',
      ogUrl: 'https://www.znanieplus.bg',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.znanieplus.bg/assets/images/logo.png',
      canonicalURL: '/login'
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platform)) {
      this.showDialog();
      this.start();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platform)) {
      this.stop();
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
      this.resetTimeOutClear();
    }
  }

  async stop() {
    if (isPlatformBrowser(this.platform)) {
      try {
        await this.scanner.stop();
      } catch (error) {
        console.warn(error);
      }
    }
  }

  async start() {

    if (isPlatformBrowser(this.platform)) {

      this.scanner = new Html5Qrcode("reader", {
        formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13]
      } as any);

      const device = await this.getDevices();

      const qrCodeSuccessCallback = (decodedText: string, decodedResult: IObjectKeys) => {
        if (this.canScan && decodedText) {
          this.active = false;
          this.submited = false;
          this.canScan = false;
          this.code = decodedText;
          this.change.markForCheck();
          this.onSubmit(decodedText);
          this.timeOut = setTimeout(() => {
            this.canScan = true;
          }, this.timeout);
        }
      };

      const qrCodeErrorCallback = () => { };

      const config = {
        fps: 10, qrbox: { width: 250, height: 180 }, videoConstraints: {
          advanced: [{
            width: 1080,
            aspectRatio: 1.3333,
            facingMode: 'environment'
          }],
        }, formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13]
      };

      try {
        await this.scanner.start(device.deviceId, config, qrCodeSuccessCallback, qrCodeErrorCallback);
      } catch (error) {
        console.warn(error)
      }

    }

  }

  onSubmit(code: string) {
    if (code?.length > 0) {
      this.card.get(code).subscribe((data: any) => {
        if (data.active) {
          this.active = true;
          this.userProvider.login(code);
          this.router.navigateByUrl('/profile');
        }
        this.submited = true;
        this.reset();
        this.change.markForCheck();
      });
    }
  }

  reset() {
    if (isPlatformBrowser(this.platform)) {

      this.resetTimeOutClear();
      this.timeOutReset = setTimeout(() => {
        this.active = false;
        this.submited = false;
        this.canScan = true;
        this.code = '';
        this.change.markForCheck()
      }, this.timeOutResetValue);

    }
  }

  resetTimeOutClear() {
    if (this.timeOutReset) {
      clearTimeout(this.timeOutReset);
    }
  }

  showDialog() {
    this.dialog.open(ConfirmDialog, {
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        message: 'Всеки притежател на валидна карта ЗНАНИЕ+ има свой потребителски профил. За да влезеш в него, просто сканирай баркода от гърба на картата.',
        buttons: [
          {
            label: 'Добре',
          }
        ]
      }
    });
  }

  async getDevices() {

    return navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    }).then((stream) => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      return navigator.mediaDevices.enumerateDevices();
    }).then((devices) => {
      const filter = devices.filter((device) => {
        const label = device.label.toLowerCase();
        const pattern = /rear|back|environment/ig;
        return device.kind == 'videoinput' && pattern.test(label);
      });
      const device = filter.pop();
      return device;
    });

  }

}
