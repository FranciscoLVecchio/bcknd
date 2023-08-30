/*
    host + /api/auth
*/

const {Router} = require('express')
const {check} = require('express-validator')
const {checkError} = require('../middlewares/check-err')
const router = Router()
const {newUser, loginUser, renewToken} = require('../controllers/auth')

router.post('/new',
    [check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe tener 6 caracteres o mas').isLength({min:5}),
    checkError],
    newUser
    )

router.post('/',
    [check('email','El email es obligatorio').isEmail(), 
    check('password','El password de tener mas de 5 caracteres').isLength({min:5}),
    checkError], 
    loginUser
    )

router.get('/renew', renewToken)







module.exports = router