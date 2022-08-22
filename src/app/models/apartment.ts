import { Currency, ApartmentTypes } from 'src/globals/config';

export class Apartment {

    _id;
    apartmentType;
    act16;
    active;
    city;
    address;
    construction;
    cover;
    createdAt;
    currency;
    description;
    floor;
    key;
    m2price;
    photos;
    price;
    quadrature;
    type;
    updatedAt;
    user;
    year;
    similar;
    ownerName;
    ownerPhone;
    ownerEmail;

    constructor({ _id, similar, apartmentType, act16, active, city, address, construction, cover, createdAt, currency, description, floor, key, m2price, photos, price, quadrature, type, updatedAt, user, year, ownerName, ownerPhone, ownerEmail }) {
        this._id = _id;
        this.apartmentType = apartmentType;
        this.act16 = act16;
        this.active = active;
        this.city = city;
        this.address = address;
        this.construction = construction;
        this.cover = cover;
        this.createdAt = createdAt;
        this.currency = currency;
        this.description = description;
        this.floor = floor;
        this.key = key;
        this.m2price = m2price;
        this.photos = photos;
        this.price = price;
        this.quadrature = quadrature;
        this.type = type;
        this.updatedAt = updatedAt;
        this.user = user;
        this.year = year;
        this.similar = similar;
        this.ownerName = ownerName;
        this.ownerPhone = ownerPhone;
        this.ownerEmail = ownerEmail;
    }

    getApartmentType() {
        for (let key in ApartmentTypes) {
            if (ApartmentTypes[key].id == this.apartmentType) {
                return ApartmentTypes[key];
            }
        }
    }

    getCurrency() {
        for (let key in Currency) {
            if (Currency[key].id == this.currency) {
                return Currency[key];
            }
        }
    }

}