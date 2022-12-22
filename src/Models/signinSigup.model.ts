import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    emailVerified:boolean;
    verifiedByAdmin:boolean;
    token: string;
    refreshToken:string;
    toDaData:Array<string>;
    status:String;

    action: {
        status: {
           type: String,
           //default:[],
        },
        statusBy: {
           type: String,
           //default: [],
        },
        role: {
           type: String,
           //   required:true,
  
        }
     },
     roles: {
		type: [String],
		enum: Array<string>,
		default: Array<string>,
	},
};

const User: Schema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    emailVerified:{
        default:false
    },
    verifiedByAdmin:{
        default:""  
    },
    status:{
        type:String,
        default:"none"
    },
    token: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
    toDaData:{
        type:Array
    },
    action: {
        status: {
           type: String,
           //default:[],
        },
        statusBy: {
           type: String,
           //default: [],
        },
        role: {
           type: String,
           //   required:true,
  
        }
     },
     roles: {
		type: [String],
		enum: ["user", "admin", "super_admin"],
		default: ["user"],
	},
});

const userModel = mongoose.model<IUser>("Doceree", User)


export default userModel;