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

router.get('/search', async function (req, res) {
    try {
        let searchName = req.query.name
        let findName = await req.models.Employee.find({ group: searchName })
        let arrJson = []
        let employeeData = findName.map(async employee => {
            try {
                let type = employee.type
                let group = employee.group
                let position = employee.position
                let name = employee.name
                let email = employee.email
                let id = employee._id
                let jsonElement = {
                    "type": type,
                    "group": "" + group,
                    "position": "" + position,
                    "name": "" + name,
                    "email": "" + email,
                    "id": id
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