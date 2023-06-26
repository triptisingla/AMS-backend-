import mongoose from 'mongoose';
const { Schema } = mongoose

const studentSchema = new Schema(
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
        enrollmentNo: {
            type: Number,
            required: true
        },
        mobNo: {
            type: Number,
            required: true
        },
        classs: {
            type: String,
            required: true
        },
        section: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        date: { type: Date, default: Date.now },
        
        hidden: Boolean,
        // _someId: { type: Schema.Types.ObjectId },
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
            // validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        firstTime: {
            type: Boolean,
            default: false
        }
        

    }
)

const studentModel = mongoose.model('StudentSchema', studentSchema);


export default studentModel;