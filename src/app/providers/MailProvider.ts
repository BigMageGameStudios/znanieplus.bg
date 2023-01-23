import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EMAIL_PROVIDER } from '../../globals';
import { IObjectKeys } from '../helpers/interfaces';

@Injectable()

export class MailProvider {

    constructor(
        private HttpClient: HttpClient,
    ) { }

    post(body): Observable<IObjectKeys> {
        return this.HttpClient
            .post(`${EMAIL_PROVIDER}`, body, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }

    private handleError(error) {
        const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return throwError(() => new Error(errMsg));
    }

}
