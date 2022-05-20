const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator } = require('../validators/user');
const {sign_up, sign_in} = require('../controllers/user.controller');


router.route('/signup')
    .post(signupValidator, asyncHandler(checkEmail), asyncHandler(sign_up));

router.route('/signin')
    .post(signinValidator, asyncHandler(sign_in));

module.exports = router;