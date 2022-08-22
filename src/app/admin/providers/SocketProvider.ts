import { Injectable, Inject, PLATFORM_ID, Output, EventEmitter, Directive } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { connect } from 'socket.io-client';
import { Environment } from '../../../globals/config'
import { User } from 'src/app/models/user';
import { AdminProvidersModule } from './module';
import { Apartment } from 'src/app/models/apartment';

@Directive()
@Injectable({
    providedIn: AdminProvidersModule
})

export class SocketProvider {

    private socket;
    @Output() postUser = new EventEmitter();
    @Output() putUser = new EventEmitter();
    @Output() postApartment = new EventEmitter();
    @Output() putApartment = new EventEmitter();
    @Output() deleteApartment = new EventEmitter();
    @Output() postWorklog = new EventEmitter();
    @Output() putWorklog = new EventEmitter();

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.init()
    }

    disconnect() {
        this.socket.disconnect(true);
    }

    reconnect() {
        if (this.socket && this.socket.connected) {
            this.disconnect();
        }
        this.init();
    }

    private init() {
        if (isPlatformBrowser(this.platformId)) {

            this.socket = connect(Environment.api_url, {

            });

            this.socket.on('post-user', (data) => {
                this.postUser.emit(new User(data));
            });

            this.socket.on('put-user', (data) => {
                this.putUser.emit(data);
            });

            this.socket.on('post-apartment', (data) => {
                this.postApartment.emit(new Apartment(data));
            });

            this.socket.on('put-apartment', (data) => {
                this.putApartment.emit(data);
            });

            this.socket.on('delete-apartment', (data) => {
                this.deleteApartment.emit(data);
            });

            this.socket.on('post-worklog', (data) => {
                this.postWorklog.emit(data);
            });

            this.socket.on('put-worklog', (data) => {
                this.putWorklog.emit(data);
            });

        }
    }

}