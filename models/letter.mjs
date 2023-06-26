import mongoose from 'mongoose';
const { Schema } = mongoose;
// require('mongoose-type-url');

const letterSchema=new Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'teacherModel'
        },
        name:{
            type: String,
            required:true
        },
        t_id: {
            type: Number,
            required: true
        },  //no need of enrollment no
        subject: {
            type: String,
            required:true
        },
        description: {
            type: String,
            required:true
        },
        startDate:{
            type:Date,
        },
        endDate:{
            type:Date,
        },
        date:{
            type: Date,
            default: Date.now
        },
        hidden: Boolean,
        // url: {
        //     type: mongoose.SchemaTypes.Url, 
        // },
        agreed: {
            type: Boolean,
            required: true
        },
        department:{
            type:Array,
            required:true,
        },

    })

    const lettersModel=mongoose.model('LetterSchema',letterSchema)
    export default lettersModel;

