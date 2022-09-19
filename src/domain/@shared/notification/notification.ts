export type NotificationErrorProps = {
    message: string,
    context: string
}

export default class Notification {
    private _erros: { [name: string]: NotificationErrorProps[] } = {}

    addError(input: NotificationErrorProps): void{
        if(!this._erros[input.context]) (this._erros[input.context] = [])
        this._erros[input.context] = [...this._erros[input.context], input] 
    }

    getMessages(input: {context?: string}): string {
        let messages
        if(input.context){
            messages = this._erros[input.context].map((error: NotificationErrorProps) => error.message).join(', ')
            return `${input.context}: ${messages}`
        }else{
            messages = Object.entries(this._erros).map(entrie => {
                return `${entrie[0]}: ${entrie[1].map((error: NotificationErrorProps) => error.message).join(', ')}`
            })
            return messages.join('; ')
    }
    }

    getErrors(input: {context?: string}): NotificationErrorProps[] | {[name: string]: NotificationErrorProps[]}{
        return input.context ? this._erros[input.context] : this._erros
    }

    hasErrors():boolean{
        return Object.entries(this._erros).length > 0
    }
}