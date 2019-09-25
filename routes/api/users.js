const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/user.js');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route GET api/users
// @desc Test route
// @access PUBLIC
// router.get('/', (req, res) => res.send('User route'));


// @route POST api/users
// @desc REGISTER USER
// @access PUBLIC
router.post('/',
[
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'please include a valid email').isEmail(),
  check('password', 'please enter a password of 6 +').isLength({ min: 6 })
],
async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   // destructure here
   const { name, password, email } = req.body;

   try {
   // see if user exits
   let user = await User.findOne({ email: email });
   // user exists
   if ( user ) {
     res.status(400).json({ errors: [ { msg: ' User already exists '}] });
   }
   // user does not exist

   // find new user gravatar
   const avatar = gravatar.url(email, {
     s: '200',
     r: 'pg',
     d: 'mm'
   });

   user = new User({
     name: name,
     password: password,
     avatar: avatar,
     email: email
   }
   )
   // encrypt password
   const salt = await bcrypt.genSalt(10); //creates salt
   user.password = await bcrpt.hash(password, salt); // hashes password with salt

   // store in DB
   await user.save();
   const payload = {
     user: {
       id: user.id
     }
   }

   // Return jsonwebtoken, returns the token with the ID of the user encoded
   jwt.sign(
    payload, config.get('jwtToken'),
   { expiresIn: 360000 },
   ( err, token ) => {
     if ( err ) throw err;
     res.json({ token });
   }
 );

 res.send('User registered')
   } catch(err) {
    console.log(err.message);
    res.status(500).send('server error');
   }
  }
);


module.exports = router;
