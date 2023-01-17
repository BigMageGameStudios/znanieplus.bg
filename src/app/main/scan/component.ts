import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { CardProvider } from '../providers';

@Component({
  selector: 'scan-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ScanPage implements OnInit, OnDestroy {

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
    private card: CardProvider,
    private change: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platform: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platform)) {
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

      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
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

      const qrCodeErrorCallback = (decodedText, decodedResult) => { };

      const config = { fps: 10, qrbox: { width: 280, height: 200 }, formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13] };

      try {
        await this.scanner.start({ facingMode: "environment" }, config, qrCodeSuccessCallback, qrCodeErrorCallback);
      } catch (error) {
        console.warn(error)
      }

    }

  }

  onSubmit(code) {
    if (code?.length > 0) {
      this.card.get(code).subscribe((data: any) => {
        if (data.active) {
          this.active = true;
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

}
