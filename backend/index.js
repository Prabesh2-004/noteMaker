import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { corsOrigin } from './config/corsOrigin.js'
import { logger } from './middleware/logger.js'
import { errorHandler } from './middleware/errorhandler.js'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import adminRouter from './routes/admin.route.js'
import notesRoute from './routes/notes.route.js'

const app = express()
const PORT = process.env.PORT || 5000;

app.use(logger)

app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOrigin))
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/notes', notesRoute)


app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running in port ${PORT}`))