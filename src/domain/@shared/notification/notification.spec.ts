import Notification from './notification'

describe("notification unit test", () => {
    it("should create errors", () => {
        const notification = new Notification()

        const errorOne = {
            message: 'error message',
            context: 'customer'
        }

        notification.addError(errorOne)

        expect(notification.getMessages({
            context: 'customer'
        })).toBe("customer: error message")

        const errorTwo = {
            message: 'error message2',
            context: 'customer'
        }

        notification.addError(errorTwo)

        const errorThree = {
            message: 'error message3',
            context: 'order'
        }

        notification.addError(errorThree)

        expect(notification.getMessages({
            context: 'customer',
        })).toBe("customer: error message, error message2")

        expect(notification.getMessages({})).toBe("customer: error message, error message2; order: error message3")

    })

    it("should check if notification has at least one error", () => {
        const notification = new Notification()

        const errorOne = {
            message: 'error message',
            context: 'customer'
        }

        notification.addError(errorOne)

        expect(notification.hasErrors()).toBe(true)
    })

    it("should get all errors of a context", () => {
        const notification = new Notification()

        const errorOne = {
            message: 'error message',
            context: 'customer'
        }

        notification.addError(errorOne)
        expect(notification.getErrors({
            context: 'customer'
        })).toStrictEqual([errorOne])
    })
})