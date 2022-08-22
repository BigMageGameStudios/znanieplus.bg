import { Component, ChangeDetectionStrategy, OnDestroy, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ApartmentDialog } from '../../shared/apartment-dialog';
import { Apartment } from 'src/app/models/apartment';
import { GalleryDialog } from 'src/app/shared/gallery-dialog';
import { SocketProvider, ApartmentProvider } from '../../providers';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MapProvider } from 'src/app/providers';

@Component({
  selector: 'admin-my-apartments-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminMyApartmentsComponent implements OnInit, OnDestroy {

  postApartment;
  putApartment;
  delApartment;

  skip = 20;
  limit = 20;
  loaded = false;
  apartments: Apartment[];

  constructor(
    private MatDialog: MatDialog,
    private ActiveRoute: ActivatedRoute,
    private SocketProvider: SocketProvider,
    private ApartmentProvider: ApartmentProvider,
    private MapProvider: MapProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    const { apartments } = this.ActiveRoute.snapshot.data;
    this.apartments = apartments;

    if (apartments.length < this.limit) {
      this.loaded = true;
    }

  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.postApartment = this.SocketProvider.postApartment.subscribe((apartment) => {
        const user = this.MapProvider.get(this.MapProvider.USER);
        if (user._id == apartment.user._id) {
          this.skip++;
          this.apartments.unshift(apartment)
          this.ChangeDetectorRef.markForCheck();
        }
      });
      this.putApartment = this.SocketProvider.putApartment.subscribe((apartment) => {
        if (this.updateApartments(apartment)) {
          this.ChangeDetectorRef.markForCheck();
        }
      });
      this.delApartment = this.SocketProvider.deleteApartment.subscribe((apartment) => {
        if (this.removeApartment(apartment)) {
          this.ChangeDetectorRef.markForCheck();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.postApartment) {
      this.postApartment.unsubscribe();
    }
    if (this.putApartment) {
      this.putApartment.unsubscribe();
    }
    if (this.delApartment) {
      this.delApartment.unsubscribe();
    }
  }
 
  updateApartments(apartment) {
    const index = this.getApartment(apartment);
    if (index > -1) {
      const apartments = this.apartments;
      apartments[index] = new Apartment({
        ...apartments[index],
        ...apartment.data
      })
      this.apartments = apartments
      return true;
    }
    return false;
  }

  track(index, apartment) {
    return apartment.key;
  }

  removeApartment(apartment) {
    const index = this.getApartment(apartment);
    if (index > -1) {
      this.apartments.splice(index, 1);
      return true;
    }
    return false;
  }

  getApartment(apartment) {
    const apartments = this.apartments;
    for (let i = 0; i < apartments.length; i++) {
      if (apartment.apartmentId === apartments[i]._id) {
        return i;
      }
    }
    return -1;
  }

  onLoadMore() {
    if (!this.loaded) {
      this.ApartmentProvider.get({
        skip: this.skip,
        limit: this.limit
      }).subscribe((data) => {

        this.skip += this.limit;

        if (data.length < this.limit) {
          this.loaded = true;
        }

        const arr = [...this.apartments, ...data];
        this.apartments = arr;
        this.ChangeDetectorRef.markForCheck();
      });
    }
  }

  openGallery(apartment) {
    this.MatDialog.open(GalleryDialog, {
      panelClass: 'gallery',
      backdropClass: 'black',
      autoFocus: false,
      data: {
        cover: apartment.cover,
        photos: apartment.photos
      }
    });
  }

  openDialog(event, apartment?) {
    this.MatDialog.open(ApartmentDialog, {
      panelClass: 'overflow-dialog',
      data: {
        apartment
      }
    });
    event.stopPropagation();
  }

  deleteApartment(event, apartment) {
    this.MatDialog.open(ConfirmDialog).afterClosed().pipe(switchMap((bool) => {
      if (bool) {
        return this.ApartmentProvider.delete(apartment._id);
      }
      return of(false);
    })).subscribe();
    event.stopPropagation();
  }

}
