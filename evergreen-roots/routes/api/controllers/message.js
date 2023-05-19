import express from 'express';
import sessions from 'express-session';

var router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newMessage = new req.models.Message({
            company: req.body.company,
            employeeName: req.body.employeeName,
            employeeEmail: req.body.employeeEmail,
            message: req.body.message,
            username: req.session.account.username,
            created_date: new Date
        })
        await newMessage.save();
        res.send({ "status": "success" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ "status": "error", "error": error })
    }
})

export default router;