class ApiError extends Error {
    constructor(status, message) {
        super(); // вызов родительского конструктора
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ApiError(400, message)
    }

    // внутренняя ошибка сервера
    static internal(message) {
        return new ApiError(500, message)
    }

    // доступа нет
    static forbidden(message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError