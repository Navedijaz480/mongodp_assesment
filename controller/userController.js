const user = require("../models/user");
const { validationResult } = require('express-validator');
const { body } = require('express-validator');

// exports.register = async (req, res) => {
//   const users = new user(req.body);
//   try {
//     const response = await users.save();
//     res.json({
//       error: false,
//       success_msg: "Data submitted successfully",
//       response: response,
//     });
//   } catch (err) {
//     res.json({
//       error: true,
//       error_msg: "Something went wrong...!",
//       response: err.toString(),
//     });
//   }
// };
  exports.logins = async (req, res) => {
    try {
        // check if the user exists
        const users = await user.findOne({ name: req.body.name });
        if (users) {
          //check if password matches
          const result = req.body.password === users.password;
          if (result) {
            res.render("secret");
          } else {
            res.status(400).json({ error: "password doesn't match" });
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      } catch (error) {
        res.status(400).json({ error :"successfully login"});
      }
};

exports.validateUser = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ];

exports.register = async (req, res) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: true,
      error_msg: "Validation failed",
      errors: errors.array(),
    });
  }

  const users = new user(req.body);
  try {
    const response = await users.save();
    res.json({
      error: false,
      success_msg: "Data submitted successfully",
      response: response,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      error_msg: "Something went wrong...!",
      response: err.toString(),
    });
  }
};