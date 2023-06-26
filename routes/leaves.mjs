import express from "express";
const router = express.Router();
import { body, validationResult } from 'express-validator';
import lettersModel from '../models/letter.mjs'
import teacherModel from '../models/teachers.mjs'

import * as dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken'
const jwt_key = 'jwtsecret';

router.post('/addleave', [
    body('sub', 'Subject length should be greater than 5 characters').isLength({ min: 6 }),
    body('desc', 'Description length should be greater than 10 characters').isLength({ min: 11 }),
],
    async (req, res) => {

        const { from,sub, desc, startDate, endDate } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        try {

            const token = req.header('auth-token')
            // console.log(token);
            if (!token) {
                return res.status(401).send("Please authenticate with valid auth-token")
            }

            const data = jwt.verify(token, jwt_key);
            // console.log(data);
            let teacher = await teacherModel.findOne({_id:data.user.id});
            // console.log(teacher);
            if(teacher.firstName.trim().toLowerCase()!==from.trim().toLowerCase())
            {
                return res.status(403).json({message: "you are not authenticated to write this leave"})
            }
            const t_id=teacher.t_id;
            const department = teacher.department;
            // console.log(department);
            let leaveLetter = {
                user: data.user.id,
                t_id,
                subject: sub,
                description: desc,
                // url: url,
                agreed: false,
                startDate,
                endDate,
                department,
                name:teacher.firstName
            }
            // console.log(leaveLetter);

            let createdLetter = await lettersModel.create(leaveLetter);
            res.json({createdLetter});
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send("Internal server error!");
        }
    }
)



//for hods
router.get('/checkleaves', async (req, res) => {
    const token = req.header('auth-token')
    // console.log(token);
    const data = jwt.verify(token, jwt_key);
    const personId = data.user.id;
    let department;
    try {
        const person = await teacherModel.findOne({ _id: personId });
        department=person.department
        // console.log(department)
        if (person.designation !== 'hod') {
            res.json({ message: "You dont have access to this information",access:false});
            return ;
        }
    }
    catch (e) {
        res.json({ messgae: "Internal sever error!" });
    }

    try {
        
        const activeLeaves = await lettersModel.find({ agreed: false,department:{$in: department}});
        console.log(activeLeaves)
        res.json(activeLeaves);
    }
    catch (e) {
        res.json({ messgae: "Internal sever error!" });
    }

})

export default router;