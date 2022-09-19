import { NotificationErrorProps } from "./notification";

export default class NotificationError extends Error {
    constructor(public errors: NotificationErrorProps[]){
        super(`${errors[0].context}: ${errors.map(error => error.message).join(', ')}`)
    }
}