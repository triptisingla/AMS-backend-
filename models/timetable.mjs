import mongoose from 'mongoose';
const { Schema } = mongoose

const timetableSchema=new Schema(
    {
        classs:
        {
            type: String,
            required: true
        },
        section:
        {
            type: String,
            required: true
        },
        // sem:
        // {
        //     type: Number,
        //     required: true
        // },
        year:
        {
            type: Number,
            required:true
        },
        mon:{
            type:Array,
            required: true
        },
        tue:{
            type:Array,
            required: true
        },
        wed:{
            type:Array,
            required: true
        },
        thu:{
            type:Array,
            required: true
        },
        fri:{
            type:Array,
            required: true
        },
        sat:{
            type:Array,
            required: true
        }
    }
)

const timetableModel = mongoose.model('TimetableSchema', timetableSchema);

export default timetableModel;