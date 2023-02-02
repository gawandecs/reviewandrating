const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);
import { Request, Response } from "express";
//User-defined function to validate the user
 const JoiSchema = Joi.object({
    email: Joi.string().email().min(5).max(50).required(),
    phone:Joi.number().integer().required()
    ,
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .messages({
        "password.minOfUppercase":
          "{#label} should contain at least {#min} uppercase character",
        "password.minOfSpecialCharacters":
          "{#label} should contain at least {#min} special character",
        "password.minOfLowercase":
          "{#label} should contain at least {#min} lowercase character",
        "password.minOfNumeric":
          "{#label} should contain at least {#min} numeric character",
        "password.noWhiteSpaces": "{#label} should not contain white spaces",
      }),
  }).unknown(true);


  export const validate =  (req:Request, res:Response, next:any) => {
    const {
      error
    } = JoiSchema.validate(req.body);
    if (error) {
      res.status(422)
        .send(error.details[0].message);
    } else {
      next();
    }
  };
  