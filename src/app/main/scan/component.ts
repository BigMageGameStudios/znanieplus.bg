import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SEOProvider } from 'src/app/providers';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog';
import { CardProvider } from '../providers';
import { BrowserCodeReader } from '@zxing/browser';
import { BarcodeFormat, DecodeHintType, MultiFormatReader } from '@zxing/library';
import { WINDOW } from 'src/app/modules/window';

@Component({
  selector: 'scan-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ScanPage implements OnInit, OnDestroy {

  code = '';

  active = false;
  submited = false;

  stream: MediaStream;
  canvasElement: HTMLCanvasElement;
  videoElement: HTMLVideoElement;
  canvasContext: CanvasRenderingContext2D;

  timeOut;
  time = 10000;

  submitTimeOut;
  canSubmit = true;
  submitTime = 1000;

  @ViewChild('video', { static: true }) video: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  canStream = false;
  streamError = false;
  isDestroyed = false
  loading = false;
  name = '';

  formats = [BarcodeFormat.EAN_13];
  scanner: BrowserCodeReader;

  constructor(
    private router: Router,
    private card: CardProvider,
    private dialog: MatDialog,
    private SEOProvider: SEOProvider,
    private change: ChangeDetectorRef,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platform: Object
  ) {
    this.SEOProvider.set({
      title: 'ЗНАНИЕ+ | Сканиране',
      description: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      keywords: 'знание,карта,отстъпка,култура,социална придобивка,znanieplus,знание плюс,знаниеплюс,znanie plus,znanie+,знание+',
      ogUrl: 'https://www.znanieplus.bg/scan',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.znanieplus.bg/assets/images/FB_Znanie+_2000x2000_09.jpg',
      canonicalURL: '/scan'
    });
    if (isPlatformBrowser(this.platform)) {
      const hints = new Map();
      const reader = new MultiFormatReader();

      hints.set(DecodeHintType.POSSIBLE_FORMATS, this.formats);

      this.scanner = new BrowserCodeReader(reader, hints)
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platform)) {
      this.videoElement = this.video.nativeElement;
      this.canvasElement = this.canvas.nativeElement;
      this.canvasContext = this.canvasElement.getContext('2d', { alpha: false, willReadFrequently: true });
      this.canvasContext.imageSmoothingEnabled = false;
      this.videoElement.addEventListener('play', this.onPlay.bind(this));

      this.getDevices().then((device) => {
        return this.startScan(device);
      }).catch((e) => {
        switch (e.name) {
          case ('NotFoundError'): {
            this.dialog.open(ConfirmDialog, {
              data: {
                title: 'Внимание',
                message: 'Не е открита камера на използваното устройство.',
                buttons: [
                  {
                    label: 'Добре',
                  }
                ]
              }
            });
            this.router.navigateByUrl('/')
            break;
          }
          default: {
            this.dialog.open(ConfirmDialog, {
              data: {
                title: 'Внимание',
                message: 'Моля, разрешете правата за използване на камерата на устройството и презаредете страницата.',
                buttons: [
                  {
                    label: 'Добре'
                  }
                ]
              }
            });
            this.router.navigateByUrl('/')
            break;
          }
        }
        this.streamError = true;
        this.change.markForCheck();
      });
    }
  }

  ngOnDestroy() {
    if (this.videoElement) {
      this.videoElement.removeEventListener('play', this.onPlay);
    }
    this.clear();
    this.stopStream();
    this.isDestroyed = true;
  }

  async stopStream() {
    if (isPlatformBrowser(this.platform)) {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
      }
    }
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
  
  onPlay() {
    requestAnimationFrame(this.scan.bind(this));
  }

  async startScan(device) {
    const aspectRatio = (this.window.innerHeight - 56) / this.window.innerWidth;
    const constraints: { [key: string]: any } = {
      audio: false,
      video: {
        width: 1080,
        aspectRatio: aspectRatio,
        facingMode: 'environment'
      }
    };

    if (device) {
      constraints.video.deviceId = device.deviceId;
    }

    return navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      if (!this.isDestroyed) {
        this.videoElement.srcObject = stream;
        this.stream = stream;
        this.canStream = true;
        this.change.markForCheck();
      } else {
        stream.getTracks().forEach(track => track.stop());
      }

    });

  }

  scan() {

    const width = this.videoElement.videoWidth;
    const height = this.videoElement.videoHeight;

    this.crop({
      width, height
    });

    try {

      const data = this.scanner.decodeFromCanvas(this.canvas.nativeElement);
      const code = data.getText();
      this.code = code;
      this.onSubmit(code);

    } catch (error) {
      // console.log(error)
    }

    setTimeout(this.scan.bind(this), 100);

  }

  crop({ width, height }) {
    const sizeW = 0.45 * width;
    const sizeH = 0.15 * height;
    this.canvasElement.width = sizeW;
    this.canvasElement.height = sizeH;

    const left = width * 0.275;
    const top = 0.35 * height;

    this.canvasContext.drawImage(this.videoElement, left, top, sizeW, sizeH, 0, 0, sizeW, sizeH);
  }

  onSubmit(code: string) {
    if (code?.length > 0 && !this.loading && this.canSubmit) {
      this.loading = true;
      this.submited = false;
      this.reset();
      this.resetVars();
      this.card.get(code).subscribe((data: any) => {
        this.loading = false;
        this.canSubmit = false;

        if (data.active) {
          this.active = true;
          this.name = `${data.first_name} ${data.last_name}`
        }

        this.submited = true;
        this.change.markForCheck();
      });
    }
  }

  clear() {
    clearTimeout(this.timeOut);
    clearTimeout(this.submitTimeOut);
  }

  reset() {
    this.clear();
    this.timeOut = setTimeout(() => {
      this.submited = false;
      this.resetVars();
    }, this.time);

    this.submitTimeOut = setTimeout(() => {
      this.canSubmit = true;
    }, this.submitTime);
  }

  resetVars(){
    this.active = false;
    this.code = '';
    this.name = '';
    this.change.markForCheck();
  }

}
