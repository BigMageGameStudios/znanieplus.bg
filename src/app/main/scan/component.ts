import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog';
import { QRCodeType } from 'src/globals';
import jsQR from 'jsqr';

@Component({
  selector: 'scan-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ScanPage {

  worker: Worker;
  workers: { worker: Worker, isReady: boolean }[];

  stream: MediaStream;
  canvasElement: HTMLCanvasElement;
  videoElement: HTMLVideoElement;
  canvasContext: CanvasRenderingContext2D;
  @ViewChild('video', { static: true }) video: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  canStream = false;
  streamError = false;
  isDestroyed = false
  translations: { [key: string]: string | Function | any } = {};

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private activated: ActivatedRoute,
    private change: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private paltform
  ) {
    if (isPlatformBrowser(this.paltform) && typeof Worker !== 'undefined') {
      this.workers = [
        {
          isReady: true,
          worker: new Worker(new URL('./scan.worker', import.meta.url), { type: 'module' })
        },
        {
          isReady: true,
          worker: new Worker(new URL('./scan.worker', import.meta.url), { type: 'module' })
        },
      ];
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.paltform)) {
      this.videoElement = this.video.nativeElement;
      this.canvasElement = this.canvas.nativeElement;
      this.canvasContext = this.canvasElement.getContext('2d', { alpha: false });
      this.canvasContext.imageSmoothingEnabled = false;
      this.videoElement.addEventListener('play', this.onPlay.bind(this));

      if (typeof Worker !== 'undefined') {
        this.setWorkers();
      }
      this.getDevices().then((device) => {
        return this.startScan(device);
      }).catch((e) => {
        switch (e.name) {
          case ('NotFoundError'): {
            this.dialog.open(ConfirmDialog, {
              data: {
                title: this.translations['alert'],
                message: this.translations['camera-alert'],
                buttons: [
                  {
                    label: this.translations['accept'],
                  }
                ]
              }
            });
            break;
          }
          default: {
            this.dialog.open(ConfirmDialog, {
              data: {
                title: this.translations['alert'],
                message: this.translations['camera-permissions'],
                buttons: [
                  {
                    label: this.translations['accept']
                  }
                ]
              }
            });
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
    this.destroy();
    this.stopStream();
    this.isDestroyed = true;
  }

  async stopStream() {
    if (isPlatformBrowser(this.paltform)) {
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

  setWorkers() {
    this.workers.forEach((item, index) => {
      item.worker.onmessage = ({ data }) => {
        item.isReady = true;
        if (data) {
          this.destroy();
          this.action(data.data);
        }
      }
    });
  }

  action(data) {
    try {

      const items: { [key: string]: any } = {};
      const [url, params] = data.split('?');
      const queryParams = params.split('&');
      
      for (const item of queryParams) {
        const [key, value] = item.split('=');
        items[key] = value;
      }

      switch (items.type) {
        case (QRCodeType.table.key): {
          this.router.navigateByUrl(QRCodeType.table.action, {
            state: {
              tableKey: items.key
            }
          });
          break;
        }
        case (QRCodeType.rating.key): {
          this.router.navigateByUrl(`${QRCodeType.rating.action}/${QRCodeType.rating.key}/${items.key}`);
          break;
        }
        case (QRCodeType.tracing.key): {
          this.router.navigateByUrl(`${QRCodeType.tracing.action}/${items.key}`);
          break;
        }
        default: {
          this.alert();
          break;
        }
      }

    } catch (e) {
      this.alert();
    }
  }

  alert() {
    this.dialog.open(ConfirmDialog, {
      data: {
        title: this.translations['alert'],
        message: this.translations['qr-code-error'],
        buttons: [
          {
            label: this.translations['accept']
          }
        ]
      }
    });
  }

  destroy() {

    if (isPlatformBrowser(this.paltform) && this.workers && typeof Worker !== 'undefined') {
      this.workers.forEach((item) => {
        item.worker.terminate();
      });
    }

  }

  onPlay() {
    if (typeof Worker !== 'undefined') {
      this.scanWorker();
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
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

  scanWorker() {

    this.canvasElement.height = this.videoElement.videoHeight;
    this.canvasElement.width = this.videoElement.videoWidth;

    const { width, height } = this.canvasElement

    if (width == 0 || height == 0) {
      return setTimeout(() => { this.scanWorker() }, 500);
    }

    const imageData = this.crop({
      width, height
    });

    const index = this.getWorker();
    if (index > -1) {
      const item = this.workers[index];
      item.isReady = false;
      item.worker.postMessage(imageData, [imageData.data.buffer]);
    }

    setTimeout(() => { this.scanWorker() }, 500);

  }

  scan() {

    this.canvasElement.height = this.videoElement.videoHeight;
    this.canvasElement.width = this.videoElement.videoWidth;

    const { width, height } = this.canvasElement;

    if (width == 0 || height == 0) {
      return requestAnimationFrame(this.scan.bind(this));
    }

    const imageData = this.crop({
      width, height
    });


    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert'
    });

    if (code) {
      return this.action(code.data);
    }

    requestAnimationFrame(this.scan.bind(this));

  }

  crop({ width, height }) {
    const sizeW = 0.35 * width;
    const sizeH = 0.25 * height;
    this.canvasElement.width = sizeW;
    this.canvasElement.height = sizeH;

    const left = width * 0.325;
    const top = 0.375 * height;

    this.canvasContext.drawImage(this.videoElement, left, top, sizeW, sizeH, 0, 0, sizeW, sizeH);

    return this.canvasContext.getImageData(
      0,
      0,
      sizeW,
      sizeH
    );
  }

  getWorker() {
    for (let i = 0; i < this.workers.length; i++) {
      const worker = this.workers[i];
      if (worker.isReady) {
        return i;
      }
    }
    return -1;
  }

}
