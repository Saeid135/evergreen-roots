import express from 'express';
import sessions from 'express-session';

var router = express.Router();

router.post('/', async (req, res) => {
    try{
        const newCompany = new req.models.Company({
            type: req.body.type,
            name: req.body.name,
            address: req.body.address,
            number: req.body.number,
            email: req.body.email,
            about: req.body.about
        })
        await newCompany.save();
        res.send({"status":"success"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({"status":"error", "error":error})
    }
})

export default router;