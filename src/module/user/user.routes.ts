import express from "express"
import { registerUser,loginUser,forgotPassword, resetPassword} from "./user.controller";
import {validate} from "./user.validation"
const router=express.Router()


router.post('/signup',validate,registerUser);
router.post("/login",loginUser)
router.post("/forgotpassword",forgotPassword)
router.post("/resetpassword/:id/:token",resetPassword)

export default router;
