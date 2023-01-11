import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CardProvider } from '../providers';

@Component({
  selector: 'card-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardComponent {

  form = new FormGroup({
    text: new FormControl('')
  });

  active = false;
  toClean = false;
  submited = false;

  @ViewChild('input', { static: false }) input: ElementRef<HTMLInputElement>;
  @ViewChild('inputBillOfLanding', { static: false }) inputBillOfLanding: ElementRef<HTMLInputElement>;

  constructor(
    private card: CardProvider,
    private change: ChangeDetectorRef
  ) { }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    if(this.toClean){
      const control: any = this.form.get('text')!;
      control.setValue('');
      this.toClean = false;
    }

    if (this.inputBillOfLanding.nativeElement == document.activeElement) {
      return true;
    }

    const c = this.form.get('text');

    switch (event.key) {
      case ('Enter'): {
        if (c.value.length > 0) {
          this.onSubmit();
        }
        break;
      }
      case ('Backspace'): {
        const value = c.value;
        c.setValue(value.slice(0, value.length - 1));
        break;
      }
      default: {
        const { key } = event;
        if (key.length == 1) {
          const value = c.value;
          c.setValue(`${value}${key}`);
        }
        break;
      }
    }
  }

  onSubmit() {
    const value = this.form.value.text;
    const element: any = document.activeElement;
    element.blur();

    this.active = false;
    this.submited = false;

    this.card.get(value).subscribe((data: any) => {
      if(data.active){
        this.active = true;
      }
      this.submited = true;
      this.toClean = true;
      this.change.markForCheck();
    })


  }

  onClear() {
    this.form.setValue({
      text: ''
    });
  }

}