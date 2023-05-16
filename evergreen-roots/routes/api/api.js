import express from 'express';
var router = express.Router();

import companyRouter from './controllers/company.js';
import usersRouter from './controllers/users.js';


router.use('/company', companyRouter);
router.use('/users', usersRouter);

export default router;