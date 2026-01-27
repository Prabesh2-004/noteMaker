import { logEvents } from "./logger.js";

export const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.log')
    const status = res.statusCode ? res.statusCode : 500;
    res.status(status).json({ message: err.message })
}