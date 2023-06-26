import mongoose from 'mongoose';
const { Schema } = mongoose

const teacherSchema = new Schema(
    {
        // name:{
        //     first:{type:'String', required:true},
        //     last:{type:'String', required:true},
        // },   this or this
       
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        t_id: {
            type: Number,
            required: true
        },
        mobNo: {
            type: Number,
            required: true
        },
        date: { type: Date, default: Date.now },
        hidden: Boolean ,
        // _someId: {Schema.Types.ObjectId},
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        firstTime: {
            type: Boolean,
            default: false
        },
        department:{
            type:Array,
            required:true
        },
        designation:{
            type:String,
            required:true
        }

    }
)

const teacherModel = mongoose.model('TeacherSchema', teacherSchema);

export default teacherModel;