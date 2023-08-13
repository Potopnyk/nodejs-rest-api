const errorMessageList = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: "Conflict"
};

const HttpErorrs = (status, message=errorMessageList) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = HttpErorrs;
