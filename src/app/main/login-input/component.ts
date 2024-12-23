import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, HostListener, ChangeDetectorRef, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SEOProvider, UserProvider } from 'src/app/providers';
import { CardProvider } from '../providers';
import { validateEmail } from 'src/app/helpers/emailValidator';


@Component({
  selector: 'login-input-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      validateEmail
    ]),
    card: new FormControl('', [Validators.required])
  });

  active = false;
  toClean = false;
  submited = false;

  @ViewChild('input', { static: false }) input: ElementRef<HTMLInputElement>;
  @ViewChild('inputBillOfLanding', { static: false }) inputBillOfLanding: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private card: CardProvider,
    private SEOProvider: SEOProvider,
    private change: ChangeDetectorRef,
    private userProvider: UserProvider,
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

  handleKeyboardEvent(event: KeyboardEvent) {

    if(event.ctrlKey){
      return true
    }

    if (this.toClean) {
      const control: any = this.form.get('text')!;
      control.setValue('');
      this.toClean = false;
    }

    if (this.inputBillOfLanding.nativeElement == document.activeElement) {
      return true;
    }

    const c = this.form.get('card');

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
    if (this.form.valid) {
      const card = this.form.value.card;
      const email = this.form.value.email;
      const element: any = document.activeElement;
      element.blur();

      this.active = false;
      this.submited = false;

      this.card.login(card, email).subscribe((data: any) => {
        if (data.active) {
          this.active = true;
          this.userProvider.login(card);
          this.router.navigateByUrl('/profile');
        }
        this.submited = true;
        this.toClean = true;
        this.change.markForCheck();
      });

    }

  }

  clearMail() {
    this.form.get('email').setValue('');
  }

  clearCard() {
    this.form.get('card').setValue('');

  }

}
