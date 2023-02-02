"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const user_service_1 = __importDefault(require("./user.service"));
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//register user api
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("start");
    console.log(req.body);
    try {
        let data = yield user_model_1.default.findOne({ email: req.body.email });
        if (data !== null) {
            res.json({ message: "Email is already Exist" });
        }
        else {
            const user = new user_model_1.default(req.body);
            const password = yield bcrypt.hash(req.body.password, saltRounds);
            user.password = password;
            const addData = yield user.save();
            res.json({
                status: "succesfull",
                data: addData,
            });
        }
    }
    catch (err) {
        res.send("err" + err);
    }
});
exports.registerUser = registerUser;
//login user api
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userData = yield user_model_1.default.findOne({
            email: req.body.email,
        });
        if (!userData) {
            res.json({ message: "Email is Not Exist" });
        }
        else {
            let result = yield bcrypt.compare(req.body.password, userData.password);
            if (result) {
                const token = jwt.sign({
                    userID: userData._id,
                }, "secretKEY", { expiresIn: "5d" });
                res.json({
                    message: "login success",
                    token: token,
                });
            }
            else {
                res.json({ message: "password does not match" });
            }
        }
    }
    catch (err) {
        res.send("err" + err);
    }
});
exports.loginUser = loginUser;
//forgot password api
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isEmailExist = yield user_model_1.default.findOne({
            email: req.body.email,
        });
        if (!isEmailExist) {
            res.json({
                success: "failure",
                message: "Email is not exist",
            });
        }
        else {
            const token = jwt.sign({
                userID: isEmailExist._id,
            }, "secretKEY", { expiresIn: "15m" });
            const id = isEmailExist._id.valueOf();
            console.log(id);
            const emailSend = yield (0, user_service_1.default)(req.body.email, id, token);
            res.status(200).json({
                success: "success",
                message: "Email send Successfully",
                token: token
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: "failure",
            message: err.message,
        });
    }
});
exports.forgotPassword = forgotPassword;
//reset password api
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    console.log(id, token);
    const { newPassword, confirmPassword } = req.body;
    try {
        //check if  user is exist is not 
        const isUserExist = yield user_model_1.default.findById(id);
        if (!isUserExist) {
            res.status(404).json({
                message: "user not exist",
            });
        }
        else {
            const { userID } = jwt.verify(token, "secretKEY");
            if (newPassword === confirmPassword) {
                //bcrypt new enter password 
                const password = yield bcrypt.hash(newPassword, saltRounds);
                const user = user_model_1.default.findByIdAndUpdate(userID, {
                    $set: { password: password },
                });
                res.status(200).json({
                    success: "success",
                    mesaage: "password reset successfully",
                });
            }
            else {
                res.json({
                    success: "failure",
                    message: "password not match",
                });
            }
        }
    }
    catch (err) {
        res.status(400).json({
            success: "failure",
            message: "user not authorised" + " " + err.message,
        });
    }
});
exports.resetPassword = resetPassword;
