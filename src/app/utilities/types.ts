export interface IUser {
    _id: string,
    type: number,
    role: number,
    position: number,
    profilePicture: {
        name: string,
        type: number,
        mime: string
    },
    phone: string,
    firstname: string,
    lastname: string,
    email: string,
    active: boolean,
    createdAt: string,
    updatedAt: string
}