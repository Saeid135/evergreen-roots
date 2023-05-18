import express from 'express';
import sessions from 'express-session';

var router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newEmployee = new req.models.Employee({
            type: req.body.type,
            group: req.body.group,
            position: req.body.position,
            name: req.body.name,
            email: req.body.email
        })
        await newEmployee.save();
        res.send({ "status": "success" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ "status": "error", "error": error })
    }
})

export default router;