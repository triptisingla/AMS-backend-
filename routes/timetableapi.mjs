import express from "express";
const router = express.Router();
import { body, validationResult } from 'express-validator';
import * as dotenv from 'dotenv'
dotenv.config();

import timetableModel from '../models/timetable.mjs'

//add time table 
//rajesh johnson
router.post('/addtimetable',
    async (req, res) => {
        const { classs, section, year, mon, tue, wed, thu, fri, sat } = req.body;

        const timetable = {
            classs, section, year, mon, tue, wed, thu, fri, sat
        }
        console.log(timetable);
        const updatedtt = await timetableModel.create(timetable);
        res.json({ updatedtt });

    }
)

router.get('/',
   async (req, res) => {
    const {query}=req;
    // console.log(query)
        const ttToShow = await timetableModel.findOne(query) ;
        console.log(ttToShow)
        if(!ttToShow)
        {
            return res.json({message:"tt not found"})
        }
        const days = {
            mon:ttToShow.mon,
            tue:ttToShow.tue,
            wed:ttToShow.wed,
            thu:ttToShow.thu,
            fri:ttToShow.fri,
        }
        res.json({days});
    })

export default router;