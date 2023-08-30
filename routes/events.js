const {Router} = require('express')
const {check} = require('express-validator');
const {isDate} = require('../helpers/isDate');
const {checkError} = require('../middlewares/check-err')
const {validateJWT} = require('../middlewares/validate_jwt')
const {getEvents,createEvent,updateEvent,deleteEvent} = require('../controllers/events')

const router = Router()

router.use(validateJWT)

router.get('/', getEvents)

router.post(
    '/',
    [
        check('title','Title needed').not().isEmpty(),
        check('start','Start date needed').custom( isDate ),
        check('end','End date needed').custom( isDate ),
        checkError
    ],
    createEvent
);

router.put(
    '/:id', 
    [
        check('title','Title needed').not().isEmpty(),
        check('start','Start date needed').custom( isDate ),
        check('end','End date needed').custom( isDate ),
        checkError
    ],
    updateEvent 
);

router.delete('/:id', deleteEvent)

module.exports = router