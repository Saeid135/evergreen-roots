import express from 'express';
var router = express.Router();

import companyRouter from './controllers/company.js';

router.use('/company', companyRouter);

export default router;