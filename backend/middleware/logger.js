import fs from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { format } from 'date-fns'

const fsPromises = fs.promises

export const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    
    try {
        const logDir = path.join(process.cwd(), 'logs')
        const logFilePath = path.join(logDir, logFileName)

        if(!fs.existsSync(logDir)) {
            await fsPromises.mkdir(logDir, { recursive: true })
        }

        await fsPromises.appendFile(logFilePath, logItem)
    } catch (error) {
        console.log(error)
    }
}

export const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    next()
}