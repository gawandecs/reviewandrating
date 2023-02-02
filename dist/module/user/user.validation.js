"use strict";
const Joi = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
//User-defined function to validate the user
function validateUser() {
    const JoiSchema = Joi.object({
        email: Joi.string().email().min(5).max(50).required(),
        phone: Joi.required(),
        password: joiPassword
            .string()
            .minOfSpecialCharacters(3)
            .minOfLowercase(4)
            .minOfUppercase(5)
            .minOfNumeric(6)
            .noWhiteSpaces()
            .messages({
            'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
            'password.minOfSpecialCharacters': '{#label} should contain at least {#min} special character',
            'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
            'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
            'password.noWhiteSpaces': '{#label} should not contain white spaces',
        }),
    }).options({ abortEarly: false });
    return JoiSchema.validate();
}
