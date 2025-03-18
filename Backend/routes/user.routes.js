const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const usercontroller = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');



router.post(
  '/register',
  [
    body('fullname')
      .notEmpty()
      .withMessage('Full name is required')
      .custom((value) => {
        if (typeof value !== 'object' || !value.firstname || !value.lastname) {
          throw new Error('Full name must include both firstname and lastname');
        }
        if (typeof value.firstname !== 'string' || value.firstname.length < 3) {
          throw new Error('First name must be at least 3 characters long');
        }
        if (typeof value.lastname !== 'string' || value.lastname.length < 3) {
          throw new Error('Last name must be at least 3 characters long');
        }
        return true;
      }),
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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  usercontroller.registeruser
);

router.post(
  '/login',
  [
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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  usercontroller.loginuser
);

router.get('/profile',authMiddleware.authUser,usercontroller.getuserProfile)

router.get('/logout',authMiddleware.authUser,usercontroller.logoutUser);

module.exports = router;
