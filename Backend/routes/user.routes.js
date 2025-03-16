const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const usercontroller = require('../controllers/user.controller');

router.post(
  '/register',
  [
    body('fullname').notEmpty().withMessage('Full name is required'),
    body('fullname.firstname')
      .isString()
      .isLength({ min: 3 })
      .withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname')
      .isString()
      .isLength({ min: 3 })
      .withMessage('Last name must be at least 3 characters long'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid Email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  usercontroller.registeruser
);

module.exports = router;
