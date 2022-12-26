const Router = require('express');
const router = new Router();
const authController = require('./authController');
const authValidator = require('./authValidator');
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');


router.post('/registration', authValidator.registrationValidator, authController.registration);
router.post('/login', authController.login);
router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers);

module.exports = router;