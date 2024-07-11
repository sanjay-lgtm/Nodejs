import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true
    },
    newName: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
})

const fileModel = mongoose.model("files", fileSchema)
export default fileModel;