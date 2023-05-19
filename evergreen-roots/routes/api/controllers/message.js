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

router.get('/search', async function (req, res) {
    try {
        let searchName = req.query.name
        let findName = await req.models.Message.find({ employeeEmail: searchName })
        let arrJson = []
        let messageData = findName.map(async message => {
            try {
                let company = message.company
                let employeeName = message.employeeName
                let employeeEmail = message.employeeEmail
                let name = message.username
                let thismessage = message.message
                let created_date = message.created_date
                let jsonElement = {
                    "company": company,
                    "employeeName": "" + employeeName,
                    "employeeEmail": "" + employeeEmail,
                    "name": "" + name,
                    "message": "" + thismessage,
                    "created_date": created_date
                }
                arrJson.push(jsonElement)
            } catch (error) {
                console.log(error)
                res.status(500).json({ "status": "error", "error": error })
            }
        })
        res.send(arrJson)
    } catch (error) {
        console.log(error)
        res.status(500).json({ "status": "error", "error": error })
    }
})
export default router;