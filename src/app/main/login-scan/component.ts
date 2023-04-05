import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SEOProvider, UserProvider } from 'src/app/providers';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog';
import { CardProvider } from '../providers';
import { BrowserCodeReader } from '@zxing/browser';
import { BarcodeFormat, DecodeHintType, MultiFormatReader } from '@zxing/library';

@Component({
  selector: 'login-scan-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginPage implements OnInit, OnDestroy {

  code = '';

  active = false;
  submited = false;

  stream: MediaStream;
  canvasElement: HTMLCanvasElement;
  videoElement: HTMLVideoElement;
  canvasContext: CanvasRenderingContext2D;

  timeOut;
  time = 3000;

  submitTimeOut;
  canSubmit = true;
  submitTime = 1000;


  @ViewChild('video', { static: true }) video: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  canStream = false;
  streamError = false;
  isDestroyed = false
  loading = false;

  formats = [BarcodeFormat.EAN_13];
  scanner: BrowserCodeReader;

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
      keywords: 'знание,карта,отстъпка,култура,социална придобивка,znanieplus,знание плюс,знаниеплюс,znanie plus,znanie+,знание+',
      ogUrl: 'https://www.znanieplus.bg/login',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.znanieplus.bg/assets/images/FB_Znanie+_2000x2000_01.jpg',
      canonicalURL: '/login'
    });
    if (isPlatformBrowser(this.platform)) {
      const hints = new Map();
      const reader = new MultiFormatReader();

      hints.set(DecodeHintType.TRY_HARDER, true);
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
      this.showDialog();

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

  onPlay() {
    requestAnimationFrame(this.scan.bind(this));
  }

  async startScan(device) {
    const constraints: { [key: string]: any } = {
      audio: false,
      video: {
        width: 1080,
        aspectRatio: 1.3333,
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

    this.canvasElement.height = this.videoElement.videoHeight;
    this.canvasElement.width = this.videoElement.videoWidth;

    const { width, height } = this.canvasElement;

    if (width == 0 || height == 0) {
      return setTimeout(this.scan.bind(this), 16);
    }

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

    setTimeout(this.scan.bind(this), 16);

  }

  crop({ width, height }) {
    const sizeW = 0.45 * width;
    const sizeH = 0.20 * height;
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
          this.userProvider.login(code);
          this.router.navigateByUrl('/profile');
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
    this.change.markForCheck();
  }

}
