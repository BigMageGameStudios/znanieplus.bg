import { IUser } from 'src/app/utilities/types';
import { UserPositions } from 'src/globals/config';
import { UserRoles } from 'src/globals/config';

export class User implements IUser {

    _id;
    type;
    role;
    position;
    profilePicture;
    firstname;
    lastname;
    phone;
    email;
    active;
    createdAt;
    updatedAt;

    constructor({ _id, type, role, position, profilePicture, firstname, lastname, phone, email, active, createdAt, updatedAt }) {
        this._id = _id;
        this.type = type;
        this.role = role;
        this.position = position;
        this.profilePicture = profilePicture;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    getRole() {
        for (let key in UserRoles) {
            if (UserRoles[key].id == this.role) {
                return UserRoles[key].name;
            }
        }
    }

    getPosition() {
        for (let key in UserPositions) {
            if (UserPositions[key].id == this.position) {
                return UserPositions[key].name;
            }
        }
    }

}