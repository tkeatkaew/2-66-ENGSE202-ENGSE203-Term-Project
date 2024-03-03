const { Router } = require("express");
const router = Router();

const { users } = require('../controllers/users');
/*
router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateInput
],login );
*/
router.get("/users", users);


module.exports = router;