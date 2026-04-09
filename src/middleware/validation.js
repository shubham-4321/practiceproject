const {body, validationResult} = require("express-validator");

exports.registerValidation = [
    body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Valid email required"),
    body("password")
    .isStrongPassword({minLength : 10})
    .withMessage("Password must be atleast 10 characters and strong"),
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
]

exports.loginValidation = [
    body("email")
    .trim()
    .normalizeEmail()
    .isEmail()  
    .withMessage("Valid email required"),
    body("password")
    .notEmpty()
    .withMessage("Password is required")
]

exports.validate = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success : false,
            errors : errors.array()
        })
    }
    next()
}