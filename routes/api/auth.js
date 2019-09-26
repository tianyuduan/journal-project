const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const config = require('config');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const User = require('../../models/user.js');
// @route GET api/auth
// @desc Test route
// @access PUBLIC
router.get('/', auth, async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});


// @route POST api/auth
// @desc Authentiate user and get token
// @access PUBLIC
router.post('/',
[
  check('email', 'please include a valid email').isEmail(),
  check('password', 'please enter a password').exists()
],
async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   // destructure here
   const { password, email } = req.body;

   try {
   // see if user exits
   let user = await User.findOne({ email: email });
   // user exists
   if ( !user ) {
     res.status(400).json({ errors: [ { msg: 'Invalid Credentials '}] });
   }
   // check if token matches
   const isMatch = await bcrypt.compare(password, user.password);

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
