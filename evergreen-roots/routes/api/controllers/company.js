import express from 'express';
import sessions from 'express-session';

var router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newCompany = new req.models.Company({
            type: req.body.type,
            name: req.body.name,
            address: req.body.address,
            number: req.body.number,
            email: req.body.email,
            about: req.body.about
        })
        await newCompany.save();
        res.send({ "status": "success" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ "status": "error", "error": error })
    }
})

router.get('/', async function (req, res) {
    try {
        let arrJson = []
        let allCompanies = await req.models.Company.find()
        let companyData = await Promise.all(
            allCompanies.map(async company => {
                try {
                    let type = company.type
                    let name = company.name
                    let address = company.address
                    let number = company.number
                    let email = company.email
                    let about = company.about
                    let id = company._id
                    let jsonElement = {
                        "type": type,
                        "name": "" + name,
                        "address": "" + address,
                        "number": number,
                        "email": "" + email,
                        "about": "" + about,
                        "id": id
                    }
                    arrJson.push(jsonElement)
                } catch (error) {
                    console.log(error)
                    res.status(500).json({ "status": "error", "error": error })
                }
            })
        );
        res.send(arrJson)
    } catch (error) {
        console.log(error)
        res.status(500).json({ "status": "error", "error": error })
    }
})

export default router;