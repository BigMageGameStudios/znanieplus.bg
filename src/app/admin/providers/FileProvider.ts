import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Environment } from '../../../globals/config';
import { AdminProvidersModule } from './module';

@Injectable({
  providedIn: AdminProvidersModule
})

export class FileProvider {

  constructor(
    private Http: HttpClient,
  ) { }

  uploadProfilePicture(formData: FormData, userId: string) {
    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');

    return this.Http
      .post(
        `${Environment.api_url}/api/${Environment.api_version}/upload/profile-picture/${userId}`,
        formData, {
          headers: headers,
          withCredentials: true
        },
      )
      .pipe(catchError(this.handleError));
  }

  uploadPhotos(formData: FormData, appartmentId: string) {
    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');

    return this.Http
      .post(
        `${Environment.api_url}/api/${Environment.api_version}/upload/appartment/photos/${appartmentId}`,
        formData, {
          headers: headers,
          withCredentials: true
        },
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return throwError(errMsg);
  }

}
