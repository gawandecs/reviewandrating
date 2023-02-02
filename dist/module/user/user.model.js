"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});
const userModel = (0, mongoose_1.model)('User', userSchema);
exports.default = userModel;
