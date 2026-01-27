import { allowedURL } from "./allowedOrigin.js";

export const corsOrigin = {
    origin: (origin, callback) => {
        if(allowedURL.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by cors'))
        }
    },
    Credential: true
}