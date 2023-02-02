import userModel from "./user.model";
import { Request, Response } from "express";
import { User } from "./interface/user.interface";
import sendEmail from "./user.service";
import errorHandler from "../../utils/errorhandler";
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = 10;

//register user api
export const registerUser = async (req: Request, res: Response, next: any) => {
  try {
    let isUserExist: User | null = await userModel.findOne({
      email: req.body.email,
    });
    if (isUserExist) {
      return next(new errorHandler("Email is already Exist", 400));
    } else {
      const user = new userModel(req.body);
      const password = await bcrypt.hash(req.body.password, saltRounds);
      user.password = password;
      const addData = await user.save();
      res.json({
        status: "succesfull",
        data: addData,
      });
    }
  } catch (err) {
    res.send("err" + err);
  }
};

//login user api
export const loginUser = async (req: Request, res: Response, next: any) => {
  try {
    let userData: User | null = await userModel.findOne({
      email: req.body.email,
    });
    if (!userData) {
      return next(new errorHandler("Email is not Exist", 404));
    } else {
      let result = await bcrypt.compare(req.body.password, userData.password);
      if (result) {
        const token = jwt.sign({ userID: userData._id }, "secretKEY", {
          expiresIn: "5d",
        });
        res.json({
          message: "login success",
          token: token,
        });
      } else {
        return next(new errorHandler("password not match", 401));
      }
    }
  } catch (err) {
    res.send("err" + err);
  }
};

//forgot password api
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const isEmailExist: User | null = await userModel.findOne({
      email: req.body.email,
    });
    if (!isEmailExist) {
      return next(new errorHandler("Email is not exist", 404));
    } else {
      const token = jwt.sign({ userID: isEmailExist._id }, "secretKEY", {
        expiresIn: "15m",
      });
      const id = isEmailExist._id.valueOf();
      console.log(id);
      const emailSend = await sendEmail(req.body.email, id, token);
      res.status(200).json({
        success: "success",
        message: "Email send Successfully",
        token: token,
        id:id
      });
    }
  } catch (err: any) {
    res.status(404).json({
      success: "failure",
      message: err.message,
    });
  }
};

//reset password api
export const resetPassword = async (req: Request, res: Response,next:any) => {
  const { id, token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  try {
    //check if  user is exist is not
    const isUserExist = await userModel.findById(id);
    if (!isUserExist) {
      return next(new errorHandler("user is not exist", 404));

    } else {
      const { userID } = jwt.verify(token, "secretKEY");
      if (newPassword === confirmPassword) {
        //bcrypt new enter password
        const password = await bcrypt.hash(newPassword, saltRounds);
        const user = userModel.findByIdAndUpdate(userID, 
           { password: password },
        );
        res.status(200).json({
          success: "success",
          mesaage: "password reset successfully",
        });
      } else {
        res.json({
          success: "failure",
          message: "password not match",
        });
      }
    }
  } catch (err: any) {
    res.status(401).json({
      success: "failure",
      message: "user not authorised" + " " + err.message,
    });
  }
};
