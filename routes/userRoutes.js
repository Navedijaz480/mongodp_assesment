const express = require("express");
const router = express.Router();
const { validateUser } = require('../middlewares/validation');

// Import the validateUser middleware

const userController = require("../controller/userController");
router.post("/register",validateUser,  userController.register);
router.get("/logins", userController.logins);


module.exports = router;