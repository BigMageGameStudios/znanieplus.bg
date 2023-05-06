import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { generateBarCode } from 'src/app/helpers/barCodeGenerator';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { trackByIndex } from 'src/app/helpers/track';
import { SEOProvider, UserProvider } from 'src/app/providers';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'profile-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileComponent {

  img: string;
  token: string;

  showItem: IObjectKeys;

  codesTypes = {
    ZNP: 'ZNP'
  }

  codes: IObjectKeys[];
  filtered: IObjectKeys[];
  ngModel = '';
  user: {
    actuve: number,
    first_name: string,
    last_name: string
  };

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private SEOProvider: SEOProvider,
    private change: ChangeDetectorRef,
    private userProvider: UserProvider,
    private activatedRoute: ActivatedRoute,
  ) {
    this.SEOProvider.set({
      title: 'ЗНАНИЕ+ | Профил',
      description: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      keywords: 'знание,карта,отстъпка,култура,социална придобивка,znanieplus,знание плюс,знаниеплюс,znanie plus,znanie+,знание+',
      ogUrl: 'https://www.znanieplus.bg/profile',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.znanieplus.bg/assets/images/FB_Znanie+_2000x2000_09.jpg',
      canonicalURL: '/profile'
    });
    const [codes, user] = this.activatedRoute.snapshot.data.result;
    this.user = user;
    this.token = this.userProvider.getCode();
    this.img = generateBarCode(this.token, 14, 90);
    this.codes = codes.map((item) => {
      if (item.code.toLowerCase() == this.codesTypes.ZNP.toLowerCase()) {
        item.parsedCode = `${this.codesTypes.ZNP}${Number(this.token).toString(36)}`
      } else {
        item.parsedCode = item.code;
      }
      return item;
    });
    this.filtered = [...this.codes];
  }

  exit() {
    this.dialog.open(ConfirmDialog, {
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        title: 'Внимание',
        message: 'Потвърждавате ли операция „ИЗХОД“?',
        buttons: [
          {
            label: 'Не'
          },
          {
            label: 'Да',
            handler: () => {
              this.userProvider.exit();
              this.router.navigateByUrl('/');
            }
          }
        ]
      }
    });
  }


  copy(text: string) {
    this.clipboard.copy(text);
    this.snackBar.open('Промоционалният код е копиран', 'Добре', {
      duration: 3000,
      panelClass: 'znp'
    })
  }

  onChange(){
    if(this.ngModel.length > 0){
      const text = this.ngModel.toLowerCase();
      this.filtered = this.codes.filter((c) => {
        if (c.website.toLowerCase().includes(text) || c.name.toLowerCase().includes(text)) {
          return true;
        }
        return false;
      });
    }else{
      this.filtered = [...this.codes];
    }
    this.change.markForCheck();
  }

  onShow(item: IObjectKeys){
    this.showItem = item;
    this.change.markForCheck();
  }

  trackByIndex = trackByIndex;

}
