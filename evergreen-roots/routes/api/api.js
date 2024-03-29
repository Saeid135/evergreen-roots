import express from 'express';
var router = express.Router();

import companyRouter from './controllers/company.js';
import employeeRouter from './controllers/employee.js'
import messageRouter from './controllers/message.js'
import usersRouter from './controllers/users.js';


router.use('/company', companyRouter);
router.use('/employee', employeeRouter)
router.use('/message', messageRouter)
router.use('/users', usersRouter);

export default router;