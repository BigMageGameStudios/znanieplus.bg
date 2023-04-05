import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SEOProvider } from 'src/app/providers';
import { CardProvider } from '../providers';

@Component({
  selector: 'card-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardComponent {

  form = new FormGroup({
    text: new FormControl('', [Validators.required])
  });

  name = '';
  active = false;
  toClean = false;
  submited = false;

  @ViewChild('input', { static: false }) input: ElementRef<HTMLInputElement>;
  @ViewChild('inputBillOfLanding', { static: false }) inputBillOfLanding: ElementRef<HTMLInputElement>;

  constructor(
    private card: CardProvider,
    private SEOProvider: SEOProvider,
    private change: ChangeDetectorRef,
  ) {
    this.SEOProvider.set({
      title: 'ЗНАНИЕ+ | Сканиране',
      description: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      keywords: 'знание,карта,отстъпка,култура,социална придобивка,znanieplus,знание плюс,знаниеплюс,znanie plus,znanie+,знание+',
      ogUrl: 'https://www.znanieplus.bg/card',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.znanieplus.bg/assets/images/FB_Znanie+_2000x2000_09.jpg',
      canonicalURL: '/card'
    });
   }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    if(event.ctrlKey){
      return true
    }

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
    if(this.form.valid){

      const value = this.form.value.text;
      const element: any = document.activeElement;
      element.blur();
  
      this.active = false;
      this.submited = false;
      this.name = '';
  
      this.card.get(value).subscribe((data: any) => {
        if(data.active){
          this.active = true;
          this.name = `${data.first_name} ${data.last_name}`;
        }
        this.submited = true;
        this.toClean = true;
        this.change.markForCheck();
      });

    }

  }

  onClear() {
    this.form.setValue({
      text: ''
    });
  }

}
