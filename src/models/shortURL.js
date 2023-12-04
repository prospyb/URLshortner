import { Schema, model } from "mongoose";
import shortId from "shortid";


const ShortUrlSchema = Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

export default model("ShortUrl", ShortUrlSchema)